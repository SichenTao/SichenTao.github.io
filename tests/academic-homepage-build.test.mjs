import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  buildAcademicHomepageAssets,
  verifyAcademicHomepageMonoliths,
} from "../scripts/v2/build-academic-homepage.mjs";

const temporaryRoots = [];

async function write(filename, contents) {
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, contents);
}

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "academic-build-"));
  temporaryRoots.push(root);
  const frontendRoot = path.join(root, "frontend");
  const outputRoot = path.join(root, "output");
  await write(path.join(frontendRoot, "js/manifest.txt"), "a.js\nb.js\n");
  await write(path.join(frontendRoot, "js/a.js"), "const a = 1;\n");
  await write(path.join(frontendRoot, "js/b.js"), "const b = 2;\n");
  await write(path.join(frontendRoot, "css/manifest.txt"), "base.css\n");
  await write(
    path.join(frontendRoot, "css/base.css"),
    ":root { color: red; }\n",
  );
  return { frontendRoot, outputRoot };
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe("Academic Homepage asset builder", () => {
  it("concatenates fragments byte-for-byte in manifest order", async () => {
    const { frontendRoot, outputRoot } = await fixture();
    const results = await buildAcademicHomepageAssets({
      frontendRoot,
      outputRoot,
    });

    expect(await readFile(path.join(outputRoot, "app.js"), "utf8")).toBe(
      "const a = 1;\nconst b = 2;\n",
    );
    expect(await readFile(path.join(outputRoot, "styles.css"), "utf8")).toBe(
      ":root { color: red; }\n",
    );
    expect(
      results.map(({ output, fragmentCount }) => [output, fragmentCount]),
    ).toEqual([
      ["app.js", 2],
      ["styles.css", 1],
    ]);
    await expect(
      verifyAcademicHomepageMonoliths({
        frontendRoot,
        monolithRoot: outputRoot,
      }),
    ).resolves.toHaveLength(2);
  });

  it.each([
    ["../escape.js\n", "unsafe fragment path"],
    ["a.js\na.js\n", "duplicate fragment"],
    ["a.css\n", "expected a .js fragment"],
    ["missing.js\n", "ENOENT"],
  ])("rejects an invalid JavaScript manifest", async (manifest, message) => {
    const { frontendRoot, outputRoot } = await fixture();
    await write(path.join(frontendRoot, "js/manifest.txt"), manifest);

    await expect(
      buildAcademicHomepageAssets({ frontendRoot, outputRoot }),
    ).rejects.toThrow(message);
  });

  it("rejects an unlisted fragment and monolith drift", async () => {
    const { frontendRoot, outputRoot } = await fixture();
    await write(path.join(frontendRoot, "js/orphan.js"), "orphan();\n");
    await expect(
      buildAcademicHomepageAssets({ frontendRoot, outputRoot }),
    ).rejects.toThrow("unlisted .js fragments: orphan.js");

    await rm(path.join(frontendRoot, "js/orphan.js"));
    await buildAcademicHomepageAssets({ frontendRoot, outputRoot });
    await write(path.join(outputRoot, "app.js"), "drifted();\n");
    await expect(
      verifyAcademicHomepageMonoliths({
        frontendRoot,
        monolithRoot: outputRoot,
      }),
    ).rejects.toThrow("differs from monolith");

    await write(path.join(path.dirname(frontendRoot), "app.js"), "manual();\n");
    await expect(
      buildAcademicHomepageAssets({ frontendRoot, outputRoot }),
    ).rejects.toThrow("source monolith is forbidden");
  });
});

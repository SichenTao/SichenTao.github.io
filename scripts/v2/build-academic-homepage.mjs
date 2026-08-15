import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const ASSET_DEFINITIONS = [
  {
    id: "javascript",
    directory: "js",
    extension: ".js",
    output: "app.js",
  },
  {
    id: "stylesheet",
    directory: "css",
    extension: ".css",
    output: "styles.css",
  },
];

function sha256(contents) {
  return createHash("sha256").update(contents).digest("hex");
}

function parseManifest(contents, manifestPath, extension) {
  const lines = contents.split(/\r?\n/);
  if (lines.at(-1) === "") lines.pop();
  if (lines.length === 0) {
    throw new Error(
      `${manifestPath}: manifest must contain at least one entry`,
    );
  }

  const entries = [];
  const seen = new Set();
  for (const [index, line] of lines.entries()) {
    const location = `${manifestPath}:${index + 1}`;
    if (line.length === 0 || line.trim() !== line) {
      throw new Error(`${location}: entries must be non-empty and unpadded`);
    }
    if (
      path.posix.isAbsolute(line) ||
      path.win32.isAbsolute(line) ||
      line.includes("\\") ||
      path.posix.dirname(line) !== "." ||
      path.posix.normalize(line) !== line
    ) {
      throw new Error(
        `${location}: unsafe fragment path ${JSON.stringify(line)}`,
      );
    }
    if (path.posix.extname(line) !== extension) {
      throw new Error(
        `${location}: expected a ${extension} fragment, received ${JSON.stringify(line)}`,
      );
    }
    if (seen.has(line)) {
      throw new Error(
        `${location}: duplicate fragment ${JSON.stringify(line)}`,
      );
    }
    seen.add(line);
    entries.push(line);
  }
  return entries;
}

async function readAsset(definition, frontendRoot) {
  const fragmentRoot = path.join(frontendRoot, definition.directory);
  const manifestPath = path.join(fragmentRoot, "manifest.txt");
  const manifest = await readFile(manifestPath, "utf8");
  const entries = parseManifest(
    manifest,
    path.relative(REPOSITORY_ROOT, manifestPath),
    definition.extension,
  );

  const fragments = [];
  for (const entry of entries) {
    const fragmentPath = path.join(fragmentRoot, entry);
    const metadata = await lstat(fragmentPath);
    if (!metadata.isFile()) {
      throw new Error(
        `${path.relative(REPOSITORY_ROOT, fragmentPath)}: fragment must be a regular file`,
      );
    }
    fragments.push(await readFile(fragmentPath));
  }

  const directoryEntries = await readdir(fragmentRoot, { withFileTypes: true });
  const listed = new Set(entries);
  const unlistedFragments = directoryEntries
    .filter(
      (entry) =>
        entry.isFile() && path.extname(entry.name) === definition.extension,
    )
    .map((entry) => entry.name)
    .filter((entry) => !listed.has(entry))
    .sort();
  if (unlistedFragments.length > 0) {
    throw new Error(
      `${path.relative(REPOSITORY_ROOT, manifestPath)}: unlisted ${definition.extension} fragments: ${unlistedFragments.join(", ")}`,
    );
  }

  const contents = Buffer.concat(fragments);
  return {
    id: definition.id,
    output: definition.output,
    fragmentCount: entries.length,
    bytes: contents.length,
    sha256: sha256(contents),
    contents,
  };
}

async function assertNoSourceMonoliths(frontendRoot) {
  const sourceRoot = path.dirname(frontendRoot);
  for (const definition of ASSET_DEFINITIONS) {
    const monolithPath = path.join(sourceRoot, definition.output);
    try {
      await lstat(monolithPath);
      throw new Error(
        `${path.relative(REPOSITORY_ROOT, monolithPath)}: source monolith is forbidden; edit frontend/${definition.directory}/manifest.txt and its fragments`,
      );
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
}

export async function buildAcademicHomepageAssets({
  frontendRoot = path.join(REPOSITORY_ROOT, "academic-homepage/frontend"),
  outputRoot = path.join(
    REPOSITORY_ROOT,
    ".generated-public/academic-homepage",
  ),
  write = true,
} = {}) {
  await assertNoSourceMonoliths(frontendRoot);
  const assets = [];
  for (const definition of ASSET_DEFINITIONS) {
    assets.push(await readAsset(definition, frontendRoot));
  }

  if (write) {
    await mkdir(outputRoot, { recursive: true });
    for (const asset of assets) {
      await writeFile(path.join(outputRoot, asset.output), asset.contents);
    }
  }

  return assets.map((asset) => ({
    id: asset.id,
    output: asset.output,
    fragmentCount: asset.fragmentCount,
    bytes: asset.bytes,
    sha256: asset.sha256,
  }));
}

export async function verifyAcademicHomepageMonoliths({
  frontendRoot = path.join(REPOSITORY_ROOT, "academic-homepage/frontend"),
  monolithRoot = path.join(REPOSITORY_ROOT, "academic-homepage"),
} = {}) {
  const generated = await Promise.all(
    ASSET_DEFINITIONS.map((definition) => readAsset(definition, frontendRoot)),
  );

  return Promise.all(
    generated.map(async (asset) => {
      const monolith = await readFile(path.join(monolithRoot, asset.output));
      if (!asset.contents.equals(monolith)) {
        throw new Error(
          `${asset.output}: fragment output ${asset.sha256} (${asset.bytes} B) differs from monolith ${sha256(monolith)} (${monolith.length} B)`,
        );
      }
      return {
        id: asset.id,
        output: asset.output,
        fragmentCount: asset.fragmentCount,
        bytes: asset.bytes,
        sha256: asset.sha256,
      };
    }),
  );
}

async function main() {
  const verify = process.argv.includes("--verify-monoliths");
  const results = verify
    ? await verifyAcademicHomepageMonoliths()
    : await buildAcademicHomepageAssets();
  for (const result of results) {
    console.log(
      `${verify ? "Verified" : "Built"} ${result.output}: ${result.fragmentCount} fragments, ${result.bytes} B, sha256 ${result.sha256}`,
    );
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}

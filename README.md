# Sichen Tao Web Product Family

这是 `https://sichentao.github.io/` 的 v2.0 源码仓库。它把个人主页、Academic Frontier、Follow Builders、YouTube Learner、JSPS KAKENHI 与可复用账户平台组织为同一产品家族，同时保留 v1.0 已成立的视觉与用户操作。

## 本地开始

要求：Node.js 24、pnpm 11.19、Deno 2.9.5。浏览器无障碍检查还需要 Chromium。

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

完整发布候选检查：

```bash
pnpm test:all
```

`test:freshness` 只接受真实来源刷新时间；内容过期时失败是预期保护，不应通过修改时间戳绕过。

## 架构

```text
src/                         Astro 门户、Account 与共享布局
packages/design-tokens/      主题、字体、色彩、间距等设计令牌
packages/ui/                 基础 UI 与可访问性契约
packages/product-patterns/   筛选、状态、权限与内容模式
academic-homepage/frontend/  Academic Homepage 分片源码
academic-frontier/           当前公开编译产物
follow-builders/             当前公开编译产物
youtube-to-ebook/            当前公开编译产物
jsps-kakenhi/                当前公开编译产物
supabase/                    数据库、RLS、Storage 与 Edge Functions
scripts/v2/                  构建和发布门禁
docs/v2/                     产品设计书、工程项目书与视觉图集脚本
```

`scripts/prepare-public.mjs` 使用明确 allowlist 生成 `.generated-public/`；Astro 只从该目录构建 `dist/`。`quant-platform`、Academic frontend 分片、根级工程目录、未经安全转换的第三方 HTML 快照和私有数据不会进入发布产物。明确列入公开资产的履历源格式、生成说明与 provenance 文件仍会随站点发布，并接受密钥和产物边界扫描。

Academic Homepage 的 `app.js` 与 `styles.css` 由 `frontend/js/manifest.txt` 和 `frontend/css/manifest.txt` 在构建时逐字节生成。构建器会拒绝不安全路径、重复项、错误扩展名、缺失或未登记分片，以及重新加入源码目录的 monolith；现有 HTML 继续使用稳定的 `app.js` 与 `styles.css` URL。动态内容目录当前属于公开编译产物，其规范生成器、权威来源和最近成功刷新记录必须由独立内容流水线确认，并以 `content/freshness.json` 与 provenance 证据进入发布门禁。

## 当前本地证据

以下数字来自 2026-08-15 当前工作树，最终发布仍以目标提交的持续集成（CI）结果为准：

| 证据                      | 当前结果                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 单元与静态契约测试        | 16/16 通过，包含 Academic 分片构建与漂移拒绝测试                                                            |
| 质量工具自证              | 7/7 通过，覆盖 URL、链接、密钥、Quant、freshness 与边界等                                                   |
| 构建与链接                | 73 个索引公开路由、17 个兼容路由、93 个 noindex 证据路由；187 个 HTML、2,603 个引用通过                     |
| 自动无障碍                | 8 条代表路由 × 2 个视口，共 16 次 axe 扫描、0 个自动违规                                                    |
| 公开安全边界              | 6/6 检查通过；324 个文件、22.17 MiB、Quant 公开产物为 0                                                     |
| 视觉验收                  | `design-qa.md` 已通过；36 页视觉与产品系统图集 PDF 已生成并验证                                             |
| 内容 freshness 与外部服务 | Follow Builders 与 JSPS 通过；Academic Frontier 与 Learning 仍阻断；Supabase/Stripe 沙盒与生产 smoke 待验证 |

## 发布边界

- `main` 只部署通过 lint、类型、单元、链接、freshness、无障碍与安全门禁的 `dist/`。
- v1.0 由 tag `v1.0` 与 `archive/v1.0` 分支保留。
- Account 在缺少 Supabase 发布配置时显式停用，公开内容继续可用。
- Stripe Secret、Supabase Service Role 与 Webhook Secret 只允许存在于服务端环境。
- 真实 Supabase/Stripe 沙盒、价格、隐私/条款与内容分发授权完成前，不启用收费。

详细说明见 [产品设计书](docs/v2/product-design-book.md)、[工程项目书](docs/v2/engineering-project-book.md) 与 [质量门禁](docs/runbooks/quality-gates.md)。

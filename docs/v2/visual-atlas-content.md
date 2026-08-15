# Sichen Tao Web Product Family v2.0 视觉画册内容脚本

> 目标：维护一套可出版、可复现、可作为未来网页设计参考的产品与视觉图集。<br />
> 当前成品：A4 横版、36 页屏幕阅读 PDF，文件名为 `Sichen-Tao-v2.0-视觉与产品系统图集.pdf`。<br />
> 当前状态：7 张 v1.0 桌面基线、7 张同视口对比、8 张 v2.0 桌面截图和 9 张移动截图已经完成；`design-qa.md` 为 Passed；36 页 PDF 已生成并逐页验证。
> 真实性原则：画册只展示已验证的公开/未配置状态；真实登录、付费权益、Stripe 和 Supabase 沙盒状态保持明确的未激活说明。

## 1. 编辑方向

### 1.1 叙事主线

全书讲述同一个设计判断：多个功能差异很大的网页可以共享一种清楚、克制、可信的视觉语言，同时保留每个工作区的任务结构。叙事从产品家族全景进入设计基础，再进入组件、状态、关键页面、账户平台和质量证据，最后给出可持续演进路线。

### 1.2 视觉语气

- 使用现有浅灰画布与白色半透明纸面，不新增品牌色；
- 大标题使用 Newsreader，目录、图注和标注使用 Sora，中日文使用现有系统回退；
- 每个跨页只表达一个判断，主体截图占 60%–75% 版面；
- 线框、编号和箭头使用 0.5–0.75 pt，颜色取当前主题的 ink、muted 和 accent；
- 截图保持原比例，不拉伸、不套设备模型、不裁掉关键导航或状态；
- 标注只解释结构、行为和证据，避免装饰性营销文案。

### 1.3 主题章节色

| 章节           | 色彩方向    | 来源                         |
| -------------- | ----------- | ---------------------------- |
| 产品家族与工程 | Tohoku 紫   | `--st-color-accent: #3e1485` |
| 学习与阅读     | Toyama 蓝灰 | `--st-color-accent: #466d7f` |
| 资助与行动     | USST 红     | `--st-color-accent: #b51c2f` |

三种颜色用于章节索引和细标记，主体画布始终保持 `#f5f5f7`。

## 2. 资产登记

### 2.1 已存在的视觉证据

以下路径相对仓库根目录。它们是本轮开始前以 1440 × 900 捕获的 v1.0 桌面基线：

| 编号 | 路径                                                             | 建议图注                                                             |
| ---- | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| B01  | `../audit-baseline/screens/desktop/01-portal-home.png`           | v1.0 Portal：以低密度卡片连接多个独立产品工作区。                    |
| B02  | `../audit-baseline/screens/desktop/02-academic-home.png`         | v1.0 Personal Homepage：个人身份、研究关键词与机构主题形成首屏层级。 |
| B03  | `../audit-baseline/screens/desktop/03-academic-publications.png` | v1.0 Publications：搜索、筛选、快速标签与论文账本构成高密度任务页。  |
| B04  | `../audit-baseline/screens/desktop/04-academic-frontier.png`     | v1.0 Academic Frontier：论文卡同时表达标题、来源、指标与研究标签。   |
| B05  | `../audit-baseline/screens/desktop/05-follow-builders.png`       | v1.0 Follow Builders：主 feed 与来源侧栏形成双栏阅读入口。           |
| B06  | `../audit-baseline/screens/desktop/06-youtube-learner.png`       | v1.0 YouTube Learner：文章目录与流程来源共享阅读器框架。             |
| B07  | `../audit-baseline/screens/desktop/07-jsps-kakenhi.png`          | v1.0 JSPS 工作台：项目筛选与时间线并置，支持从机会发现进入行动。     |

这些截图位于工作区证据目录，未必进入最终仓库。出版构建应先复制经过 QA 的原始文件到受版本控制的画册资产目录，并记录 SHA-256。

### 2.2 可直接引用的品牌资产

| 资产                 | 路径                                                      | 用途                     |
| -------------------- | --------------------------------------------------------- | ------------------------ |
| 29 图标 sprite       | `academic-homepage/assets/icons/ui-icons.svg`             | 组件、导航与图标词汇页   |
| 人像                 | `academic-homepage/assets/images/avatar-openai.jpg`       | Personal Homepage 关键页 |
| Tohoku 标志          | `academic-homepage/assets/institutions/tohoku-logo.svg`   | 主题与机构页             |
| Toyama 标志          | `academic-homepage/assets/institutions/toyama-symbol.svg` | 主题与机构页             |
| USST 标志            | `academic-homepage/assets/institutions/usst-logo.svg`     | 主题与机构页             |
| Frontier 标志        | `academic-frontier/favicon.svg`                           | 产品地图                 |
| Follow Builders 标志 | `follow-builders/favicon.svg`                             | 产品地图                 |
| JSPS 标志            | `jsps-kakenhi/favicon.svg`                                | 产品地图                 |

### 2.3 最终 QA 视觉证据

本轮证据已统一输出到 `work/audit-v2/`，具体文件名和视口状态在 `design-qa.md` 中锁定：

```text
work/audit-v2/screens/desktop/01-portal-home.png
work/audit-v2/screens/desktop/02-academic-home.png
work/audit-v2/screens/desktop/03-academic-publications.png
work/audit-v2/screens/desktop/04-academic-frontier.png
work/audit-v2/screens/desktop/05-follow-builders.png
work/audit-v2/screens/desktop/06-youtube-learner.png
work/audit-v2/screens/desktop/07-jsps-kakenhi.png
work/audit-v2/screens/desktop/08-account.png
work/audit-v2/screens/mobile/01-portal-home.png
…
work/audit-v2/screens/mobile/08-account.png
work/audit-v2/comparisons/*.png
```

实际证据集包含 31 张界面 PNG：7 张 v1.0 桌面基线、7 张 v1/v2 对比、8 张 v2 桌面截图和 9 张移动截图。Account 另有方案卡、中文界面和移动菜单的局部证据；画册未把未配置的服务状态包装成登录成功证据。

## 3. 36 页成品结构

本节与已生成 PDF 的 36 页结构一致。内容数字来自 2026-08-15 最终本地构建与内容核验；页面同时保留 freshness、沙盒和生产 smoke 的真实阻断状态。

### 3.1 封面与产品地图（1–9 页）

| 页码 | 内容             | 证据与编辑任务                                   |
| ---: | ---------------- | ------------------------------------------------ |
|    1 | 封面             | v2.0 候选验收快照；浅灰画布与克制标题系统        |
|    2 | 版本与证据边界   | 36 页、31 张 PNG、基准提交与外部激活条件         |
|    3 | 目录             | Product Map 至 Quality & Roadmap 六章            |
|    4 | 编辑前提         | 保留视觉真相、按任务分类、用证据验收             |
|    5 | Product Map 章首 | 从多站点集合进入可理解的产品家族                 |
|    6 | 产品家族         | 一个 Portal、五个内容工作区、一个 Account 服务层 |
|    7 | 三层信息架构     | 产品家族、工作区任务、组件/内容/状态             |
|    8 | 关键用户旅程     | 身份、论文、视频、资助和付费权益五条完成路径     |
|    9 | v1.0 视觉基线    | 7 张 1440 × 900 真实浏览器截图                   |

### 3.2 设计基础（10–14 页）

| 页码 | 内容                   | 证据与编辑任务                                 |
| ---: | ---------------------- | ---------------------------------------------- |
|   10 | Foundations 章首       | 颜色、字体、尺度和响应式的系统边界             |
|   11 | 画布与表面             | 生产令牌的 canvas、surface、ink 与 line        |
|   12 | 三套机构主题           | Tohoku、Toyama、USST 强调色与同一交互语义      |
|   13 | 字体、间距、圆角与控件 | 受控的字号、2–32 px 间距、圆角、阴影与控件高度 |
|   14 | 响应式基础与 29 个图标 | 320–1760 px 断点与真实 SVG sprite              |

### 3.3 组件与状态（15–19 页）

| 页码 | 内容             | 证据与编辑任务                                                              |
| ---: | ---------------- | --------------------------------------------------------------------------- |
|   15 | Components 章首  | 令牌、基础组件和产品模式的三层责任                                          |
|   16 | 组件契约         | 按钮、字段、卡片、徽标与 loading/empty/error/stale/paywalled 状态           |
|   17 | 站点外壳         | 全局导航、当前页、语言、主题、44 px 移动触控与 Account 入口                 |
|   18 | 产品模式         | 筛选账本、长文阅读器与学习阅读器                                            |
|   19 | 状态与 freshness | Follow Builders、JSPS 为 PASS；Frontier、Learning 为 FAIL；总门禁 BLOCKED 2 |

第 19 页明确记录失败原因：Academic Frontier 的 8 篇候选更新会删除 14 篇现有记录且缺少审核链；Learning 缺少站点专用导入器。

### 3.4 产品页（20–27 页）

| 页码 | 产品               | 最终成品中的数据与状态                                                                                    |
| ---: | ------------------ | --------------------------------------------------------------------------------------------------------- |
|   20 | Product Pages 章首 | 七个真实产品首屏的共享外壳和领域差异                                                                      |
|   21 | Portal             | 一个入口连接五个内容工作区与 Account                                                                      |
|   22 | Personal Homepage  | 52 篇论文、11 个外部资料、8 个开源项目；15 JS + 11 CSS manifest 分片                                      |
|   23 | Publications       | 搜索、筛选、快速标签、结果数、重置和复制动作                                                              |
|   24 | Academic Frontier  | 15 篇当前公开论文；2026-05-08；**FAIL**                                                                   |
|   25 | Follow Builders    | 26 X + 6 podcasts + 2 blogs；32 tweets + 1 podcast + 1 blog = 34；**PASS**                                |
|   26 | YouTube Learner    | 2 篇文章；2026-05-15；站点专用导入器缺失；**FAIL**                                                        |
|   27 | JSPS KAKENHI       | 21 programs / 7 open / 2 priority / 62 timeline / 23 forms / 164 guides / 31 sources / 24 calls；**PASS** |

Follow Builders 的生成时间为 `2026-08-15T06:27:33.693Z`。JSPS 的生成时间为 `2026-08-15T18:05:04+09:00`，其下一截止时间为 2026-09-17 16:30 JST。

### 3.5 账户平台（28–32 页）

| 页码 | 内容                      | 证据边界                                                     |
| ---: | ------------------------- | ------------------------------------------------------------ |
|   28 | Account Platform 章首     | 可复用身份、计费、权益与学习内核                             |
|   29 | Account 身份              | 真实展示服务未配置状态与移动菜单；未伪造登录成功画面         |
|   30 | 方案与权益                | 免费/月度/年度方案键已对齐；Stripe Price 与沙盒行为待验证    |
|   31 | 支付事实链与 15 表内核    | Checkout → Webhook → Subscription → Entitlement              |
|   32 | 行级安全（RLS）与私有内容 | Anonymous、Authenticated、Owner/Admin、Service Role 权限矩阵 |

### 3.6 质量、发布与封底（33–36 页）

| 页码 | 内容                   | 最终证据                                                                     |
| ---: | ---------------------- | ---------------------------------------------------------------------------- |
|   33 | Quality & Roadmap 章首 | 视觉 QA、自动门禁、外部沙盒和正式部署分层证明                                |
|   34 | 响应式与视觉 QA        | 1440 × 900 与 390 × 844 同状态证据；`design-qa.md` **PASSED**                |
|   35 | 质量与路线图           | 16/16 unit；7/7 quality-tools；16/0 axe；6/6 security；187 HTML / 2,603 refs |
|   36 | 封底                   | 站点 URL、v2.0、2026-08-15 与一致的编辑结语                                  |

第 35 页同时记录最终构建边界：73 个 indexed public routes、17 个 compatibility routes、93 个 `noindex` evidence routes、324 个文件 / 22.17 MiB，Quant 公开产物为 0。候选结论明确保留 freshness **BLOCKED 2**、Supabase/Stripe 沙盒和 production smoke 未完成的边界。

## 4. 截图生产清单

### 4.1 共同条件

1. 使用用户选择的 in-app Browser；
2. 桌面 1440 × 900、移动 390 × 844，device scale factor 固定；
3. 清空或显式记录 locale、theme、query、auth 和 storage 状态；
4. 等待字体、图片和异步内容稳定，记录页面 URL 与 commit；
5. 同一比较组使用相同视口、语言、主题、滚动位置和数据；
6. 原图保存 PNG，禁止二次 JPEG 压缩或拉伸；
7. 文件名、SHA-256、路由、视口和状态写入截图 manifest。

### 4.2 必拍状态

| 页面     | 桌面                      | 移动           | 专项状态                             |
| -------- | ------------------------- | -------------- | ------------------------------------ |
| Portal   | 首屏                      | 菜单关闭/打开  | 三主题之一                           |
| Academic | 首页、Publications        | 首页、筛选     | 空结果、focus                        |
| Frontier | Home、Metrics             | Home、语言菜单 | 单篇详情、stale                      |
| Builders | Feed、Article             | Feed、Article  | 搜索、缺图提示                       |
| Learner  | Feed、Article、Transcript | 同左           | 时间戳同步、校稿切换、paywalled      |
| JSPS     | Home、Program、Forms      | Home、Timeline | 筛选、stale                          |
| Account  | 未配置、匿名、登录、权益  | 同左           | 错误、Checkout cancel/success return |

当前 36 页成品已覆盖公开/未配置的桌面、移动和同视口对比证据。Account 的已登录、真实权益、Checkout 和 Customer Portal 状态需要 Supabase/Stripe 沙盒，因此未在本候选画册中表述为已验证画面。

## 5. 图注写作规范

- 第一行说明用户看到什么；第二行说明该结构帮助完成什么；
- 每条图注不超过 55 个中文字符或 90 个英文字符；
- 不写“完美”“完全安全”“全面合规”等无法由截图证明的判断；
- 数据数字附快照日期；自动化结果附 commit 或 CI run；
- stale、未配置、未验收和未运行沙盒使用明确状态词；
- 外部来源页面标出来源名称，不把聚合页描述为原始事实来源。

## 6. 成品验收

### 内容

- 所有页码、路由、数据数字和版本与目标提交一致；
- Account 接口、方案键和数据库字段的静态契约统一结果已复核；真实沙盒状态继续明确标为未激活；
- freshness 结果与页面显示一致；
- 中英日文经过语言检查，机器翻译有清楚标识。

### 视觉

- 所有界面图来自真实浏览器和目标提交；
- v1/v2 比较使用同视口和同状态；
- 截图无拉伸、错误裁切、模糊字体、滚动条遮挡或个人数据；
- 色彩、字体和图标均来自现有设计系统或真实资产；
- `design-qa.md` 已标记 Passed，且 P0/P1/P2 未解决项为 0。

### 输出

- 屏幕 PDF 已生成为 A4 横版，共 36 页；
- PDF 无 JavaScript、无加密，页面尺寸与页数已经工具验证；
- 36 页已逐页渲染检查溢出、孤行、裁切和错误状态表述；
- 印刷机交付版如需出血、印刷色彩输出意图或专用装订，应从同一生成源单独导出并打样。

## 7. 当前可出版状态

36 页屏幕 PDF 已生成并验证，v2.0 桌面/移动真实截图、同视口并排比较和 `design-qa.md` Passed 证据已经进入成品。画册准确标记了当前产品边界：freshness 仍有 2 项失败，Supabase/Stripe 沙盒与 production smoke 仍未完成；这些外部阻断项不影响画册作为当前候选验收快照的准确性。

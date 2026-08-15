# v1.0 到 v2 迁移映射

## 迁移原则

先把重复视觉映射到共享组件，再移动页面数据和行为。每次替换都需要截图对比、键盘回归和状态测试，以现有视觉为基准。

## 选择器映射

| v1.0 家族                                                      | v2 目标                              | 说明                                    |
| -------------------------------------------------------------- | ------------------------------------ | --------------------------------------- |
| `.button`、`.button-primary`、产品私有 action 类               | `.st-button` + tone                  | 保留胶囊、主题色、hover 和 loading 合同 |
| `.theme-trigger`、`.locale-trigger`、`.portal-trigger`         | `.st-icon-button` + disclosure       | 保留 30/34 px header 控件和 Escape 行为 |
| `.input`、`.fb-search`、产品私有输入                           | `.st-field` + `.st-input/.st-select` | 统一 label、help、invalid 关系          |
| `.record-card`、`.module-card`、publication/story/article 卡片 | `.st-pattern-resource-card`          | 数据和链接结构仍由产品域决定            |
| publications/frontier/jsps 的 filter toolbar                   | `.st-pattern-filter-bar`             | 结果计数、URL 状态和空结果合同统一      |
| `.empty`、`.fb-empty`、`.empty-state`                          | `.st-state--empty`                   | 加入 live region 和恢复动作             |
| quant global loading/error + 各页面局部 spinner                | `.st-pattern-async-panel`            | 六状态互斥，避免页面闪烁受保护内容      |
| `.site-header`、`.shell`、各产品宽度覆盖                       | `.st-pattern-shell`                  | 由 readable/wide/workbench 模式表达     |
| Follow Builders / YouTube 阅读双栏                             | `.st-pattern-reader`                 | 保留 760 + 340 px 实际布局              |

## 产品复用矩阵

| 模式           | Portal | Academic           | Frontier       | Builders | YouTube      | JSPS            |
| -------------- | ------ | ------------------ | -------------- | -------- | ------------ | --------------- |
| Shared shell   | ✓      | ✓                  | ✓              | ✓        | ✓            | ✓               |
| Resource card  | ✓      | ✓                  | ✓              | ✓        | ✓            | ✓               |
| Filter ledger  |        | Publications       | Papers/Metrics | Feed     | Library      | Calls/Forms     |
| Freshness      |        | Metrics            | 全部数据       | Feed     | Library      | Calls/Deadlines |
| Reader         |        | Publication detail | Paper detail   | Article  | Transcript   | Guide           |
| Entitlement    |        |                    |                |          | Premium      |                 |
| Async boundary |        | 动态指标           | 数据集         | Feed     | Library/Auth | 数据集          |

## 资产迁移

图标 sprite 在 Academic Homepage 和 JSPS 中内容完全相同。v2 先通过 `existingAssets.iconSprite` 指向 Academic Homepage 版本，应用迁移稳定后再由根工程移动到公共静态目录并更新一个常量。头像、机构标志和工作区 favicon 同样只通过资产表引用，页面不复制文件。

## 分批顺序

1. 导入 tokens，证明三个主题和三语言的 computed style 与基线一致。
2. 替换无业务逻辑的按钮、字段、卡片和状态面板。
3. 替换筛选账本、阅读器和站点外壳，同时迁移 URL 状态。
4. 接入服务端 freshness 和 entitlement 数据，保持客户端只负责展示。
5. 删除已无引用的旧 CSS 前执行全站截图、可访问性和链接回归。

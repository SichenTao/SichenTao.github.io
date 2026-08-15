# Sichen Tao v2 共享设计系统

## 结论

这套设计系统把现有网页已经形成的视觉语言整理为一个共享实现层。它保留浅灰画布、Newsreader 展示字体、Sora 界面字体、胶囊控制器、轻量阴影、三套院校主题和现有图片及图标，不承担品牌重绘。

## 三层结构

1. `@sichentao/design-tokens`：颜色、字体、间距、圆角、阴影、动效、断点、三主题。
2. `@sichentao/ui`：按钮、图标按钮、字段、卡片、徽标、提示、骨架、状态面板及无框架 TypeScript 契约。
3. `@sichentao/product-patterns`：站点外壳、异步边界、筛选条、资源卡、数据新鲜度、权限门和长文阅读器。

导入顺序是设计令牌、基础组件、产品模式。`@sichentao/product-patterns/css` 已经逐层导入依赖，应用只使用产品模式时可仅导入这一份 CSS。

## 采用边界

- 视觉值只能进入 `design-tokens`。组件和产品模式通过 `var(--st-*)` 使用这些值。
- 页面数据、文案、语言、路由、服务端授权和支付状态由产品应用负责。
- `data-theme` 继续使用 `tohoku`、`toyama`、`usst`，本地存储键继续使用 `sichen-homepage-theme`。
- 客户端权限状态只控制展示。下载、付费内容和用户数据的最终授权必须由服务端执行。

## 验证

从仓库根目录运行：

```bash
node docs/design-system/validate.mjs
```

脚本检查令牌引用、主题完整性、异步状态、焦点和减弱动效契约、包导出目标、现有资产路径以及 UI 层的硬编码颜色漂移。

## 文档索引

- [视觉基础](./foundations.md)
- [基础组件契约](./components.md)
- [产品模式契约](./patterns.md)
- [可访问性目标](./accessibility.md)
- [现有页面迁移映射](./migration-map.md)

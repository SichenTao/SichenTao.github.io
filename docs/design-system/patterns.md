# 产品模式契约

## 站点外壳

`.st-pattern-shell` 提供共同画布、44 px header 和三种内容宽度：readable、wide、workbench。页面需保留唯一 `<main>`、可跳过导航链接和清晰的当前导航 `aria-current="page"`。

外壳只负责布局。主题、语言和工作区切换器由应用状态控制，并继续写入已有 URL 参数和存储键。

## 异步边界

每个依赖数据或权限的模块都使用单一 `data-state`，从而杜绝 content、spinner 和错误提示同时出现。

```ts
import {
  resolveAsyncPanelState,
  asyncPanelAttributes,
} from "@sichentao/product-patterns";

const state = resolveAsyncPanelState({
  entitlement: "granted",
  loading: false,
  error: false,
  itemCount: records.length,
  stale: sourceIsStale,
});
const attributes = asyncPanelAttributes(state);
```

解析优先级是错误、权限确认、权限拒绝、数据加载、空结果、过期、可用。权限确认完成前保持 loading，权限拒绝后进入 paywalled，可避免页面先请求或短暂显示受保护内容。`data-state-view` 分别保存 loading、empty、error、stale 和 paywalled 视图；ready 时只显示内容。

## 筛选数据账本

`.st-pattern-filter-bar`、`.st-pattern-ledger` 和 `.st-pattern-resource-card` 组合 Academic Publications、Academic Frontier、Follow Builders 与 JSPS 列表页。

筛选结果更新必须：

1. 在可见位置显示结果数量和当前条件。
2. 将相同条件同步到 URL，刷新和分享后可以恢复。
3. 空结果展示清除筛选动作。
4. 数据失败保留用户已经输入的搜索条件。
5. 键盘焦点不因重排自动跳回页面顶部。

## 数据新鲜度

`resolveFreshness()` 接收更新时间、当前时间和允许的最大年龄，返回 fresh、stale 或 unknown。页面应显示来源、更新时间和时区；unknown 不能伪装为 fresh。

stale 表示数据仍可阅读，但可能已过期。该状态不会自动删除内容，也不会单独证明来源失效。

## 权限门

`.st-pattern-entitlement` 适用于 YouTube Learner 的登录与付费入口。`EntitlementState` 包含 checking、anonymous、free、premium、blocked；`hasEntitlement()` 只计算展示状态。

服务端仍需在数据库行级安全策略、私有存储签名 URL 和下载接口中再次验证用户与订阅。价格、税务、退款和计划名称由支付域提供，设计系统不硬编码这些业务值。

paywalled 视图至少提供：当前内容级别、用户已有权益、主要升级动作、登录入口，以及恢复购买或管理订阅的入口。用户取消支付后返回原内容上下文。

## 长文阅读器

`.st-pattern-reader` 复用 Follow Builders 与 YouTube Learner 已经使用的 760 px 正文、340 px rail 和 `clamp(42px, 6vw, 86px)` 间距。1160 px 以下改为单栏，rail 取消 sticky。

阅读器的章节跳转应使用真实锚点，当前章节只通过 `aria-current="location"` 补充说明。逐字稿时间戳必须是按钮或链接，并给出可理解的可访问名称。

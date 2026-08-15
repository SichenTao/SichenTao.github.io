# 基础组件契约

## 共同约束

基础组件使用 `st-` 命名空间，避免与 v1.0 的 `.button`、`.card`、`.input` 冲突。TypeScript 函数只返回 class 和语义属性，适用于 Astro、React、Vue 或原生模板。文案由应用注入并本地化。

## 按钮和图标按钮

普通操作使用原生 `<button>`。导航继续使用 `<a href>`；链接不模拟 disabled 状态。

```ts
import { buttonContract, iconButtonContract } from "@sichentao/ui";

const save = buttonContract({ tone: "primary", size: "lg", busy: false });
const menu = iconButtonContract({
  label: "打开菜单",
  expanded: false,
  controls: "site-menu",
});
```

可访问性契约：

- 图标按钮的 `label` 是必填参数；内部 SVG 设置 `aria-hidden="true"` 和 `focusable="false"`。
- busy 同时设置 `disabled`、`aria-disabled`、`aria-busy` 和 `data-pending`，避免重复提交。
- 可见文本中的 loading 变化应放在 `aria-live="polite"` 区域，不能只旋转图标。
- `:focus-visible` 保留主题色焦点轮廓；禁用状态不响应 hover 位移。

## 字段

```html
<div class="st-field">
  <label class="st-label" for="query">关键词</label>
  <input class="st-input" id="query" aria-describedby="query-help" />
  <p class="st-field-help" id="query-help">搜索标题、作者和摘要。</p>
</div>
```

错误发生时，使用 `aria-invalid="true"`，并把错误元素 id 加入 `aria-describedby`。label 必须通过 `for` 和 id 绑定。placeholder 只能补充示例，不能替代 label。

## 卡片和资源链接

`.st-card` 是视觉容器，本身没有交互语义。整卡跳转时使用一个覆盖明确的主链接，并避免在同一卡片中嵌套多个不可区分的点击区域。包含多个操作时，卡片保持容器，标题链接和按钮分别进入键盘顺序。

## 徽标与提示

- `.st-badge` 表达短元数据，不能成为唯一的状态说明。
- `.st-alert[data-tone]` 只决定视觉。动态错误使用 `role="alert"`，普通更新使用 `role="status"`。
- 已经存在于初始页面的说明不需要 live region，避免首屏重复播报。

## 加载骨架和旋转器

骨架是装饰性占位，应放在带 `aria-busy="true"` 的父容器中并设置 `aria-hidden="true"`。旋转器同样不能单独承担 loading 文案。全局 `prefers-reduced-motion: reduce` 会把旋转和过渡缩短为 0.01 ms。

## 状态面板

`UiState` 包含 `idle`、`loading`、`empty`、`error`、`stale`、`paywalled`、`success`。使用 `stateAttributes()` 生成 live-region 属性，并提供可见标题、说明及一个主要恢复动作。

| 状态      | 语义                            | 主要动作                 |
| --------- | ------------------------------- | ------------------------ |
| loading   | `role=status`、`aria-busy=true` | 等待或取消               |
| empty     | `role=status`                   | 清除筛选或创建第一项     |
| error     | `role=alert`                    | 重试；保留已有输入       |
| stale     | `role=status`                   | 查看更新时间、来源或刷新 |
| paywalled | `role=status`                   | 登录、升级或管理订阅     |
| success   | `role=status`                   | 继续当前任务             |

状态文案必须说明发生了什么、数据是否保留和用户能执行的下一步。颜色和图标只作为辅助线索。

## Disclosure

`disclosureContract()` 绑定 trigger 与 panel 的 id、`aria-controls`、`aria-expanded`、`aria-labelledby` 和 `hidden`。`bindDisclosure()` 提供点击切换和 Escape 关闭后恢复焦点；应用卸载时必须调用返回的清理函数。

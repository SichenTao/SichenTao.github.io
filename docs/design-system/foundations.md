# 视觉基础与来源

## 证据边界

以下令牌来自 v1.0 production CSS 和共享 JavaScript 的实际值。它们建立可维护的唯一来源，并不表示每个旧页面已经完成迁移。主题值按 CSS 最终层叠结果提取；例如旧主题块中各自的背景最终被共同的浅灰画布覆盖，v2 令牌因此记录实际渲染值。

## 来源表

| 基础       | v2 表达                                                | production 来源                                                                                                              |
| ---------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| 画布和表面 | `--st-color-canvas`、`surface*`                        | `portal.css`、`academic-homepage/styles.css`、`academic-frontier/styles.css`、`jsps-kakenhi/styles.css` 的根令牌与共同覆盖块 |
| 三主题     | Tohoku、Toyama、USST                                   | 上述 CSS 的 `data-theme` 块；`assets/shared/homepage-platform.js` 的主题顺序、标签和存储键                                   |
| 字体       | Newsreader、Sora、中日文字体回退、IBM Plex Mono 回退   | `assets/shared/homepage-fonts.css`；字体文件复用 `assets/shared/fonts/**`                                                    |
| 外壳宽度   | 1180、1440、1480、1600 px                              | `assets/shared/homepage-layout.css`                                                                                          |
| 间距与圆角 | 2 至 32 px 常用间距；6、8、14、18、24、34、999 px 圆角 | 全站 production CSS 中重复使用的真实值                                                                                       |
| 阴影       | subtle、card、float、page、accent                      | 共享 shell、Academic、Frontier、JSPS 的卡片和控制器阴影                                                                      |
| 动效       | 160、180、220、320、560 ms                             | 全站 hover、tray、进入和 reveal 动效                                                                                         |
| 语义状态   | info、success、danger、warning                         | `quant-platform/css/base.css` 的实时状态和 toast 颜色                                                                        |
| 断点       | 380、760、820、1160、1440、1760 px                     | 共享布局与主要产品页面的媒体查询                                                                                             |

## 主题结构

公共画布保持 `#f5f5f7`，主题只改变文字层级、强调色、辅助色和相关柔和表面：

| 主题   | 主强调色  | 文字      | 辅助方向   |
| ------ | --------- | --------- | ---------- |
| Tohoku | `#3e1485` | `#111111` | 黑色与灰紫 |
| Toyama | `#466d7f` | `#15212a` | 蓝灰       |
| USST   | `#b51c2f` | `#21191a` | 红色与蓝色 |

`defaultTheme` 仍是 Tohoku。未知值以及旧的 `base`、`default` 值通过 `normalizeTheme()` 统一回到 Tohoku。

Toyama 原有 `muted` 色在浅灰画布上的小字对比度略低于 4.5:1。v2 保留该原始令牌用于非文字装饰，并把同一现有调色板中的 `ink-soft` 映射为 `text-muted`。基础组件只用 `text-muted` 渲染次级文字，因此没有引入新颜色。

## 字体规则

- 拉丁界面、按钮和元数据使用 Sora。
- 大标题和资源标题使用 Newsreader。
- 中文正文通过 `body[data-lang="zh"]` 使用 PingFang SC 等系统字体。
- 日文正文通过 `body[data-lang="ja"]` 使用 Hiragino Sans 等系统字体。
- 代码和定宽数据使用 IBM Plex Mono 回退栈。

## 响应式规则

断点由 TypeScript 导出，因为 CSS 自定义属性不能直接参与媒体查询条件。CSS 组件当前使用 production 的 760 px 移动断点；阅读器使用 1160 px 从双栏转为单栏。页面应用需要更细的布局时，应从 `breakpoints` 选择已经存在的值。

## 资产复用

`@sichentao/ui/assets` 提供现有资源的类型化路径：

- `academic-homepage/assets/icons/ui-icons.svg`：29 个既有符号；
- 个人头像与 portrait favicon；
- Tohoku、Toyama、USST 机构标志；
- Academic Frontier、Follow Builders、JSPS 工作区标志。

组件通过 SVG `<use>` 或普通 `<img>` 使用这些文件。装饰性图片使用空 `alt`，表达内容的图片由页面提供本地化 `alt`。

# stories.html 内容规格表（v003）

> 格式改版说明：v001/v002是逐场景大段描述性文字，改起来不方便。参考了storyboard（分镜脚本）行业惯例——一行=一个场景，左列视觉/右列文字——v003改成表格，一行一个场景，直接在表格里改文字就行，不用在大段落里找位置。
> 版本历史都留在本文件夹（`D01-History/`），不再放`Z01_archive`统一归档处。

## 场景总表

| # | 标题 | 图片 | 正文/对话（精简） | 备注 |
|---|---|---|---|---|
| 1 | 9:00——今天要做什么？ | man_computer.png | Jason向T00问今天任务；待办清单弹出+高亮新任务；要件定义4条（公司页/产品/联系方式/多语言） | 关联PJ19_todolist_assistant |
| 2 | Jason一句话，T00全接手 | man_computer.png（同图） | Jason："根据客户邮件试着做个网站"；T00回显：读邮件→定要件→建站 | 场景1到场景3的过渡 |
| 3 | 几分钟后，网站做好了 | 纯CSS浏览器mockup（无图片） | 进度框3条✓；网站mockup+requirements.md文件卡 | 本站自己的AI建站功能，非独立PJ编号 |
| 4 | 拜访客户 | meishi_exchange.png | 单图，无文字叠加 | irasutoya.com授权 |
| 5 | 一起看网站 | undraw_meeting.svg + 浏览器mockup | 左：对话卡片"让这个更突出"；右：icon居中+金色高亮+"↑就是这个icon" | — |
| 6 | 转发反馈，T00马上改好 | email_to_ai00.png / email_ai00_reply.png + 2个浏览器mockup | 邮件截图2张（占位邮箱）；Before(icon居中高亮，**无文字标注**)/After(icon左上) | 关联PJ14_email_agent |
| 7 | 第二轮反馈 | 无图，虚线文字框 | "同一画面，这次是具体指出点" | — |
| 8 | 再见 | ojigi_bow.png | 单图，无文字叠加 | irasutoya.com授权 |
| 9 | 回家后，把细节做对 | man_computer.png（380px放大版）+ 深色屏幕mockup | req/reply三段式：📌原文(根据file.md改细节/生成详细设计书)→🔎mapping→✅回答；文件卡detailed-design.md | — |
| 10 | 完成 | undraw_agreement.svg | 🎉+"本日分完了"；客户："感谢你们的完美工作，期待下次合作" | — |

## 页面级文案

| 位置 | 内容（中文，key见下表） |
|---|---|
| H1（故事标题，2026-07-30起兼作页面唯一H1） | Jason如何用T00工作的一天 |
| 副标题/intro | Jason，一名软件工程师，用自己的AI工作流「T00」完成日常开发。 |
| 结尾免责声明 | 客户是虚构合成，但每个功能都真实存在 |
| CTA按钮 | 看看T00还能做什么→ 链接index.html |

> 2026-07-30变更：原来页面顶部单独有一个"幕后故事"标题+一句话简介（`.st-hero`区块），已删除；故事本身的标题升级成页面唯一的H1，副标题换成上表这条更聚焦"Jason是谁、T00是什么"的介绍。

## i18n key对照（改文字时去`assets/i18n.js`搜这些key）

`stories_t00day_title` / `stories_t00day_intro` / `stories_t00day_s1_h`~`s8_*`（场景N对应`sN_*`，场景9是`s7_*`，场景10是`s8_*`，历史命名遗留，未重新编号以免打乱现有引用）

## 图片文件一览

| 文件名 | 场景 | 内容 | 来源 |
|---|---|---|---|
| man_computer.png | 1/2/9 | 单人男性用电脑 | 自制/下载素材 |
| meishi_exchange.png | 4 | 两人交换名片 | irasutoya.com |
| undraw_meeting.svg | 5 | 两人开会 | undraw.co |
| email_to_ai00.png / email_ai00_reply.png | 6 | 邮件截图（占位邮箱） | Playwright截图生成 |
| ojigi_bow.png | 8 | 鞠躬告别 | irasutoya.com |
| undraw_agreement.svg | 10 | 握手+签合同 | undraw.co |

## 改动方式提醒

直接改上面"场景总表"里对应行的文字描述，或者说"第N场景改成……"，不用重新描述图片/布局细节。CSS精确数值（圆角/阴影/动画曲线）不记在这里，交给`stories.html`源码本身。

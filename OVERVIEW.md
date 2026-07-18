# PJ50（原PJ44）一览（项目完成后自动生成，方便一眼看清这个项目都做了什么）

## 这个项目是做什么的

maysuns.uk 个人品牌网站（单文件HTML，GitHub Pages + Cloudflare托管）。2026-07-08 收到用户"全权处理"授权后，将原来纯"产品展示"页面，改造为同时服务"找工作 / 吸引投资 / 加关注引流"三个目的的个人网站，内容与 `PJ53_job_search_appeal` 的简历/求职材料保持一致。

## 结构决策（本次任务核心产出）

**没有采用"一个目的一个文件夹"。** 改为：单一个人品牌叙事（共享的 About 背景故事）+ 三个受众各自独立的锚点区块（`#recruiters` `#investors` `#follow`），首屏下方设快捷入口跳转。理由见 `REQUIREMENTS.md`「结构问题的回答」章节。

## 全部产出/变更文件

| 文件 | 类型 | 一句话说明 |
|------|------|-----------|
| `F:\T00\PJ50_personal_website\index.html` | 网站主文件 | 全面改版：新增About(含AI自学时间线)、扩充Portfolio(新增4个AI/Agent项目卡片)、新增For Recruiters/For Investors/Follow三个受众区块、统一联系邮箱、语言标签修正为en；2026-07-18新增中/日/英三语言切换（`data-i18n`+字典+localStorage）+ Hero/Portfolio区块顺序调整为产品优先 + About段落精简 |
| `F:\T00\PJ50_personal_website\REQUIREMENTS.md` | 需求文档 | 记录原始需求、结构决策与理由、历次改动范围（含2026-07-18三语言化决策）、未解决事项 |
| `F:\T00\PJ50_personal_website\OVERVIEW.md` | 项目一览 | 本文件 |
| `F:\T00\PJ50_personal_website\help_screenshots\` | 截图 | 三语言切换效果验证截图（zh/ja/en各一张，若线上验证成功） |

未改动：`CLAUDE.md`（项目基本信息，无需更新）、`CNAME`（域名绑定，未触碰）。

## 关键决策摘要

- **联系邮箱**：实际使用 `j6016086@gmail.com`（品牌专用邮箱，2026-07-18用户确认），历史文档中"改成gao616188@gmail.com"的记录有误，已在REQUIREMENTS.md订正。
- **站点语言**：2026-07-18起从纯英文升级为中/日/英三语言可切换，默认语言按 `localStorage` → `navigator.language` 判定，不强制英文。
- **首屏结构**（2026-07-18）：Hero改为产品导向，Portfolio提到About前面，个人履历移到About区块并精简为一段。
- **投资人区块语气**刻意克制，不用"高速增长""独角兽"等夸大词汇，与`PJ53/draft_investor_pitch.md`口径一致。
- **简历不直接嵌入网站**：招聘方区块用"发邮件索要简历"的CTA。
- **About区块精简**（2026-07-18）：原两段合并压缩为一段，约压缩35%，时间线bullet保留不变，完整履历细节仍在Recruiters区块。三语言版本压缩程度一致。

## 已知限制 / 需要用户后续处理

- **X（Twitter）/Facebook 链接是占位符**（`href="#"`），发布前必须由用户替换为真实账号链接，否则是死链接。
- **Portfolio区块做了取舍**，未收录T00全部产品（如PJ20认知症支援App等），只展示了与PJ53/PJ51简历证据链一致、且强度较高的几个项目，避免信息过载。
- 未改动任何支付/API Key/密钥相关配置（本项目原本也未见此类配置文件）。
- 三语言字典目前只存在于 `index.html` 内联 `<script>` 中，新增/修改任何 `data-i18n` 文案时需要同步改三处（en/zh/ja三个dict），没有做成外部JSON或翻译管理工具，属于单文件HTML方案下的可接受维护成本。

## 状态

✅ 内容与结构改版完成（2026-07-08）；✅ 首屏产品优先改版完成（2026-07-18）；✅ 中/日/英三语言切换 + About精简完成（2026-07-18），已commit+push。待用户：①填入真实X/Facebook链接 ②可选：审阅中/日文翻译措辞是否符合个人偏好。

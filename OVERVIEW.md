# PJ50（原PJ44）一览（项目完成后自动生成，方便一眼看清这个项目都做了什么）

## 这个项目是做什么的

maysuns.uk 个人品牌网站，Vultr服务器 + Cloudflare DNS托管（2026-07-19从GitHub Pages迁移过来，见下方"部署迁移"一节）。2026-07-18 完成一次大改版：从"单文件单页站"改造为"多页静态站"，定位从"求职简历"彻底转向"产品门户 + 投资人/合作伙伴门面"。2026-07-19 完成第二次改版：从"产品卡片堆砌"改为"讲故事型展示"（菜单分层+3个Featured Story+信任指标）。

## 2026-07-19 部署迁移：GitHub Pages → Vultr服务器

**原因**：用户其他项目（report/shop/memo/reader/games.maysuns.uk）都在同一台Vultr服务器（167.179.106.32），PJ50单独留在GitHub Pages不好统一管理；顺带解决了一个真实bug（GitHub Pages给自定义域名提供的是`*.github.io`通用证书，不是`maysuns.uk`专属证书，浏览器会有安全警告）。

**做了什么**：
- 文件上传到 `/var/www/pj50-website`（纯静态HTML，无需构建）
- nginx配置 `/etc/nginx/sites-enabled/maysuns.uk`
- `certbot`申请Let's Encrypt证书，已验证`https://maysuns.uk/`证书是`CN=maysuns.uk`专属证书（到期2026-10-17，自动续期）
- Cloudflare DNS：删除原本指向GitHub Pages的4条A记录（185.199.108/109/110/111.153），新增1条A记录指向`167.179.106.32`（跟其他maysuns.uk子站一致的配置方式）
- 已实测验证：`https://maysuns.uk/`和`about.html`等页面均返回200，证书正确

**以后怎么部署改动**：本地改完 `git commit+push`（保留版本历史）→ `scp`上传改动文件到服务器 → nginx立即生效，不需要重新构建。详见本项目`CLAUDE.md`"部署步骤"一节。

**已知限制**：GitHub Pages托管本身没有关闭（只是DNS不再指向它），是历史遗留但不影响现状；MX邮件路由记录（`route1/2/3.mx.cloudflare.net`）本次未改动，邮箱转发不受影响。

## 2026-07-19 改版：菜单重构 + 讲故事型主页

**背景**：用户反馈"首页内容太多，感觉不好"。参考Replit/Cursor/Figma等竞品调研（Agent完成），改为故事驱动的信息架构。

**核心变更**：
- **菜单**：从3项（Home/About/Contact）扩展为5项，新增"Why Maysun AI?"+"Featured Stories"下拉（3个故事+案例库入口）+"Resources"下拉（文档/GitHub/联系）
- **主页**：Hero改为问句式承诺+3路径CTA（试用/演示/学习），新增3个Featured Story区块（一键生成网页/家里指挥AI邮件自动化/T00框架），每个故事含场景描述+5个卖点+2个数据指标+CTA
- **信任建立**：无真实用户案例，改用"功能指标+框架优势"（4类场景/4+项目应用/80%周期缩短/3语言支持）替代
- **Title/Meta**：从"Jason Gao个人简历"改为"Maysun AI Platform 功能导向"，新增WebApplication JSON-LD结构化数据
- **多语言**：日/英/中三语全量覆盖新增的全部文案（Hero、3个故事、菜单、底部CTA、信任指标）

**产出文件**：
- `assets/site.css` — 新增下拉菜单样式、Featured Story区块样式、信任指标条样式、底部CTA样式
- `assets/i18n.js` — 新增约60个翻译key × 3语言（nav_*/story1-3_*/trust_*/bottom_cta_*）
- `index.html` — 重写nav（下拉菜单）+ Hero + 3个Featured Story区块 + 信任指标条 + 底部CTA，原有Portfolio产品网格保留在下方
- `help_screenshots/redesign_ja_desktop.png` / `redesign_ja_mobile.png` — Playwright验证截图（日语，桌面+移动端）

**已知限制/待办**：
- "Why Maysun AI?"菜单项和"更多案例库"暂时指向`about.html#framework`和`index.html#portfolio`（避免死链接），尚未建独立的`why-maysun-ai.html`和`case-studies.html`页面
- Featured Story的"演示"目前是静态icon占位（🌐/📧/🧩），未接入真实动画/视频演示（调研报告建议的"高优先级"项，需要额外时间制作）
- 游戏国际化（games.maysuns.uk内容本身的日英翻译）尚未开始，本次只完成了maysuns.uk主站的三语言
- product-agent-platform.html作为Story 1"一键生成网页"的CTA目标页，是现有产品的近似映射，不是专门新建的对应页面

## 2026-07-18 改版核心决策

**站点结构从单页改为多页**：原来所有内容在一个 `index.html` 里滚动切换区块，现在拆成：
- `index.html` — 首页/作品集总览+导航
- `about.html` — 关于我（履历+T00框架"团队"说明+投资人区块，全部并入About导航项）
- 10个 `product-*.html` — 每个产品独立详情页

三语（日/英/中）翻译集中放在共享的 `assets/i18n.js` 一个文件里，`assets/site.css`/`assets/main.js` 全站共享，无框架、无构建步骤，仍是纯静态HTML。

**调性彻底转向"产品+投资人"，不再像"招聘别人"或"求职简历"**：删除了原来的"For Recruiters & Hiring Managers"整个板块（含"我在找工作"式措辞、简历索取按钮），About页改为纯粹的履历陈述+专业化转型陈述，LinkedIn链接全站移除。

## 全部产出/变更文件

| 文件 | 类型 | 一句话说明 |
|------|------|-----------|
| `F:\T00\PJ50_personal_website\index.html` | 首页 | 重写为产品作品集总览+导航，10张产品卡片各自链接到独立详情页 |
| `F:\T00\PJ50_personal_website\about.html` | 关于我页（新增） | 履历（含新增：物流/商品贩卖/生产管理/金融四类系统经验、C#/VB.NET/Java/C++/JavaScript、全流程工程经验）+T00框架+投资人区块 |
| `F:\T00\PJ50_personal_website\product-rag.html` 等10个文件 | 产品详情页（新增） | 本地RAG应用、个人AI Agent平台、邮件驱动任务Agent、记忆助手、MyAI、MD阅读器、吃药提醒App、KDP电子书、游戏大厅、电商直销平台，各一个独立页面 |
| `F:\T00\PJ50_personal_website\assets\site.css` | 共享样式（新增） | 全站12个页面共用的CSS |
| `F:\T00\PJ50_personal_website\assets\i18n.js` | 共享翻译字典（新增） | 日/英/中三语，171个key，语言按钮顺序固定为 日本語/EN/中文 |
| `F:\T00\PJ50_personal_website\assets\main.js` | 共享逻辑（新增） | 语言切换、主题切换（深色/浅色，含localStorage记忆） |
| `F:\T00\PJ50_personal_website\CLAUDE.md` | 项目基本信息 | 更新文件结构说明为多页站 |
| `F:\T00\PJ50_personal_website\REQUIREMENTS.md` | 需求文档 | 追加"2026-07-18 多页化改版"完整章节，12条需求逐条记录执行结果 |
| `F:\T00\PJ50_personal_website\help_screenshots\*.png` | 测试截图 | Playwright验证截图：首页(日/英/中三语言)、About页(中文)、产品详情页(吃药提醒/电商)、桌面(1280px)与移动(390px)宽度 |

## 12条需求逐条完成情况

| # | 需求 | 状态 |
|---|------|------|
| 1 | 加About菜单，团队/投资人内容归位 | ✅ |
| 2 | 单页站→多页站，每产品独立页 | ✅ |
| 3 | 语言顺序日→英→中，中文不第一 | ✅ |
| 4 | About扩充：4类系统经验+5种语言+全流程 | ✅ |
| 5 | 删除"像在招聘别人"的调性 | ✅ |
| 6 | 转化为专业自信的投资人向表述 | ✅ |
| 7 | 删除LinkedIn链接 | ✅ |
| 8 | 删除找工作/招聘相关表述 | ✅ |
| 9 | "关注旅程"与"联系我"去重 | ✅（已合并为统一Contact入口） |
| 10 | 联系入口精简为导航+页尾各一处 | ✅ |
| 11 | 保留"AI作品查看md内容"功能 | ⚠️ 见下方"需要用户确认" |
| 12 | PJ20吃药提醒App标注核实 | ✅ 确认未部署，"开发中"标注准确，未改动 |

## 需要用户确认/后续处理的事项

1. **第11条"查看AI作品时能看到md文件内容"的功能，在现有代码（含全部git历史）中未找到任何实现痕迹**。已如实排查，没有凭空补一个不存在过的功能。如果这个功能记忆中确实存在过，可能在别的项目或未提交的本地改动里，需要用户提供更多线索（哪个页面、什么触发方式）才能继续处理。
2. **PJ25（MD阅读器）、PJ27（游戏大厅）当前只有子域名链接（reader.maysuns.uk / games.maysuns.uk），产品详情页均已直接引用这两个真实链接**——这两个前提是它们本身已经公开可访问（此前记录显示均已上线），本次未重新逐一验证这两个子域名当前是否仍然可访问，建议用户自行确认一下。
3. **X（Twitter）/Facebook 等其他社交账号链接**：本次改版没有新增这类占位链接（原来的占位符已一并清理，随GitHub链接一起精简），如果以后需要展示，需要用户提供真实账号地址再加回来。
4. **中/日文案由AI撰写翻译**，非机器直译，但建议用户过一遍About页履历细节（尤其是"物流/商品贩卖/生产管理/金融"四类系统的具体描述）是否准确匹配真实经历，必要时可微调措辞。

## 未改动

- `CNAME`（域名绑定）、部署方式（GitHub Pages + Cloudflare DNS）均未触碰。
- 未改动任何支付/API Key/密钥相关配置。

## 状态

✅ 12条需求中11条已完整落地，1条（#11 md内容查看功能）因现有代码中确无实现痕迹，已如实标注为待用户确认，未杜撰。已用Playwright实测：首页/About/产品详情页在三语言下正确渲染、语言切换顺序正确、主题切换正常、桌面与移动宽度均无横向溢出、导航跳转正常、吃药提醒App正确标注"开发中"且无死链接。截图见 `help_screenshots/`。**2026-07-19已commit+push（`cad3cd7`）到 `github.com/maysunAI/maysuns.uk`，GitHub Pages会自动部署**，建议几分钟后自行访问 maysuns.uk 核实线上效果。

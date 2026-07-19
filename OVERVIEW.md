# PJ50（原PJ44）一览（项目完成后自动生成，方便一眼看清这个项目都做了什么）

## 这个项目是做什么的

maysuns.uk 个人品牌网站，Vultr服务器 + Cloudflare DNS托管（2026-07-19从GitHub Pages迁移过来，见下方"部署迁移"一节）。2026-07-18 完成一次大改版：从"单文件单页站"改造为"多页静态站"，定位从"求职简历"彻底转向"产品门户 + 投资人/合作伙伴门面"。2026-07-19 完成第二次改版：从"产品卡片堆砌"改为"讲故事型展示"（菜单分层+3个Featured Story+信任指标）。

## 2026-07-20 续2：今天全部改动已部署到线上 + 找到并修复了"看起来像bug"的真正根因（缓存）

**背景**：用户发现`https://maysuns.uk/index.html`还是老版本，问是不是地址错了——不是地址问题，是今天一整天的改动只存在于本地`F:\T00\PJ50_personal_website`和本地`python -m http.server`预览，从未commit/push/部署到线上。

**部署动作**：
- `git add -A && git commit && git push` 到 `github.com/maysunAI/maysuns.uk`（此前一直是未提交状态）
- `scp`全部html文件+`assets/i18n.js`+`assets/site.css`+`assets/main.js`到Vultr服务器`/var/www/pj50-website/`
- 用`curl`+Playwright在真实`https://maysuns.uk/`域名上验证，确认线上已经是今天的最终版本（21个html文件，跟本地一致）

**顺带定位到今天反复出现的"语言切不回来/页面显示老内容"这个bug的真正原因——不是代码逻辑问题，是缓存**：
用Playwright在真实域名上测试时，浏览器把老版本的`assets/i18n.js`缓存住了，即使刷新了HTML页面本身，浏览器仍然复用缓存的旧JS文件（里面没有今天新加的翻译key），导致部分文字翻译不出来、显示英文原文/老文字，看起来就像"语言切换坏了"——直接用`fetch`+加时间戳参数重新拉取验证，确认服务器上的文件其实一直是对的，问题100%出在浏览器缓存这一层。

**修复**：给全部21个html文件里的`assets/site.css`/`assets/i18n.js`/`assets/main.js`引用都加上`?v=20260720`版本号参数（例如`assets/i18n.js?v=20260720`）。以后每次真正改了这几个共享文件并重新部署时，把这个版本号改掉（比如改成部署日期），浏览器会把它当成一个新地址重新下载，不会再用旧缓存——这是标准的cache busting做法，一次性根治，不需要每次都提醒用户手动强制刷新。

**已验证**：修复前用同一个Playwright浏览器实测复现了问题（`window.SITE_I18N.zh.nav_updates_label`是`undefined`，页面英文中文混杂）；加了版本号参数+重新部署后，同一个浏览器（没清缓存）刷新即恢复正常，`nav_updates_label`能正确读到。

## 2026-07-20 续：portfolio.html精简为纯AI作品集 + 未来展望删除高考例子改成外语学习/RAG

**背景**：用户明确要求`portfolio.html`（"作品集"）不要再显示MD阅读器/游戏大厅/电商直销平台/吃药提醒/KDP/记忆助手这6项——这几项要么已有独立顶级导航（游戏大厅/Maysun商店），要么已经在`products-general.html`（记忆助手/MD阅读器/吃药提醒）。

**做了什么**：
- `portfolio.html`：删除"记忆助手"卡片（原在AI工具组）+ 整个"Published & Shipped"分组（MD阅读器/吃药提醒/KDP/游戏大厅/商店5张卡片）——现在这个页面纯粹只剩AI Agent与自动化5个项目（生成应用/RAG/Agent平台/邮件Agent/MyAI），跟"AI产品▾"下拉里"AI工具集"锚点的定位完全一致
- 副标题从"按类型分组"改成"AI Agent与自动化方向真正做出来的东西"，跟实际内容匹配
- 6个product-*.html页面的"← Back to all products"链接改了目标：`product-memory/reader/medication.html`→`products-general.html`（这几个产品实际住在这里）；`product-kdp/games/shop.html`→`index.html`（这几个各自有独立入口，没有统一列表页）——避免"返回全部作品"点回去却看不到自己的产品这种断层体验
- `whats-next.html`：删除了"用AI帮日本大学入试申请材料"这个例子，换成"外语学习和本地RAG知识库已经初步验证可行性"，记忆助手/MD阅读器的"日常真实使用"这部分保留没动

**已验证**：`node --check`通过；grep全站无死链接；Playwright确认portfolio.html中文版只剩5张AI卡片、whats-next.html正文不再含"大学受験"字样且含"外语学习"/"RAG"

## 2026-07-20：五项内容任务——AI产品下拉修复+T00知识库扩充+动态改下拉+未来展望重写+About投资人板块精修

**背景**：nav已在全站20个html文件统一为8项菜单（含3个下拉），本次是在这套导航基础上做5项独立内容任务，不涉及`index.html`hero区/分类1工具credit行，不涉及`product-*.html`自身产品内容。

**1. AI产品▾下拉去占位**：
- "AI工具集"（`nav_aiproducts_tools`）→ 改为 `portfolio.html#ai-tools`，给`portfolio.html`第一个分组（AI & Agent Engineering）加了 `id="ai-tools"` 锚点，低风险方案（未重构portfolio.html其余结构）。
- "一般工具集"（`nav_aiproducts_general`）→ 新建 `products-general.html`，只列记忆助手/MD阅读器/吃药提醒App三项（复用已有的`card_memory_*`/`card_reader_*`/`card_medication_*`翻译key，未新建重复文案），明确排除KDP/游戏大厅/商店（各自已有独立顶级导航项）。**判断依据**：portfolio.html现有分组无法只筛出这3项而不混入KDP/游戏/商店，直接锚点会指向错误内容，因此选新建页面而非同页锚点。
- 影响文件：全部20个html文件的nav区块（`portfolio.html#ai-tools`+`products-general.html`两个链接替换，机械式脚本批量执行并逐文件核对无遗漏）。

**2. `knowledge-t00.html` 扩充**（真实内容，隐私克制）：新增第4段说明T00是"沟通协议+记忆/上下文约定+持续增长的Markdown操作指南"的组合；新增"里面都有什么"4项网格（沟通协议/项目组织规范/信任级别标注/文档习惯），均为高层级概念描述，**未引用/未转述任何`temp01_req.md`/`temp03_reply.md`/`RESUME.md`等私有文件的具体内容**；末尾新增一段顺带介绍MD阅读器（`product-reader.html`）的软性引导（"翻一堆散落的.md文件很麻烦，这也是做MD阅读器的原因之一"），未做硬销售。

**3. "动态"改下拉 + AI行业动态分模块**：
- 全部20个html文件的nav，"动态"从单一`<a>`改为`.nav-dropdown`（子项：AI行业动态→`updates.html#news`，更新日志→`updates.html#changelog`），新增`nav_updates_label/nav_updates_news/nav_updates_changelog`三语key，旧`nav_updates`key已从三语块整体移除。
- `updates.html`的AI行业动态区块，从单一大占位框改为4个分类模块（Claude / Codex / 其他AI编程工具 / 其他AI动态），逐一标注"内容制作中/Coming soon/準備中"——**去看过`F:\T00\PJ09_ai_news_search\CLAUDE.md`确认现状**：PJ09是"手动按钮触发"的搜索工具，MVP仅本地验证跑通，未部署公网，因此本次未编造任何新闻标题，4个模块均为诚实占位。
- `updates.html`加了`id="news"`/`id="changelog"`两个锚点。

**4. `whats-next.html` 首段重写**（真实内容，布局完全未动）：删除原"还没有确定路线图"的表述，改为三点方向：深耕C端产品追求win-win、从工程师向产品经理角色转型、以及"用AI帮忙准备日本大学入试申请材料+记忆助手/MD阅读器被真实日常使用"作为建立信心的具体经历。只改了`next_sub`/`next_intro_p`两个key的文案，卡片区（Line群/微信群/邮件/GitHub）结构未动。

**5. `about.html` 投资人板块精修**：
- 原`inv_p1`确实提到了"MD阅读器、迷你游戏大厅"——已删除这两处提及。
- 新增"已经验证过的事"列表（复用已有的`.story-points`样式，未加CSS）：记忆系统（记忆助手，强调"不是演示品"）、知识库基础设施（本地RAG应用+T00个人知识管理框架）、日常自动化（邮件驱动AI Agent）。
- `inv_sub`（板块副标题）改为直接以"25年企业交付经验"开头，让25年背景成为最先看到的差异化资产，不再是段落末尾的一句带过。
- **判断/缺口**：未添加"外语学习"相关内容——核对了PJ50当前全部产品列表（RAG/Agent平台/邮件Agent/记忆助手/MyAI/MD阅读器/吃药提醒/KDP/游戏大厅/商店/网页生成器），**目前没有任何语言学习类产品**，按要求如实标注缺口，未编造产品。

**i18n**：新增/修改共约50个三语key（nav_updates_*3个、upd_news_*8个、kt00_*11个、pgen_*4个、inv_proof_*4个+inv_sub/inv_p1修改、next_sub/next_intro_p修改），脚本核对全部新增/修改key三语言各出现恰好1次（共3次），旧`nav_updates`/`upd_news_placeholder`两个废弃key已从三语块完整移除；`node --check assets/i18n.js`通过。

**已验证**：本地复用已运行的`python -m http.server 8090`；Playwright对6个受影响页面（updates.html动态下拉展开态、knowledge-t00.html日文/英文两版、whats-next.html、about.html投资人板块、portfolio.html#ai-tools锚点、products-general.html新页、updates.html移动端390px）截图，全部页面控制台0错误0警告（仅预期内的favicon 404，不计入）；grep核对全站html文件内部链接无死链（仅CSS/JS资源路径的脚本误报，非真实死链）。

**产出/变更文件**：
- 新建：`F:\T00\PJ50_personal_website\products-general.html`
- 改：`F:\T00\PJ50_personal_website\assets\i18n.js`（新增/修改约50个三语key）
- 改：全部20个既有html文件的nav区块（`index.html`/`about.html`/`portfolio.html`/`stories.html`/`updates.html`/`whats-next.html`/`knowledge-t00.html`/`knowledge-rag.html`/`knowledge-general.html`/11个`product-*.html`）——AI产品链接修复+动态改下拉
- 改：`F:\T00\PJ50_personal_website\knowledge-t00.html`（正文扩充，nav变更之外的部分）
- 改：`F:\T00\PJ50_personal_website\updates.html`（AI行业动态分4模块+两个锚点id，nav变更之外的部分）
- 改：`F:\T00\PJ50_personal_website\about.html`（投资人板块精修，nav变更之外的部分）
- 改：`F:\T00\PJ50_personal_website\portfolio.html`（第一分组加`id="ai-tools"`，nav变更之外的部分）
- 新增：`F:\T00\PJ50_personal_website\help_screenshots\`下7张本次验证截图

**已知限制**：
1. "一般工具集"新建了独立页面而非同页锚点，跟"AI工具集"（同页锚点）方案不统一，属有意识的取舍（见任务1判断依据）。
2. AI行业动态4个分类模块目前全部是占位，取决于PJ09何时真正部署为可展示的公开内容源。
3. 投资人板块未包含语言学习相关内容（当前站内无对应产品，如实标注为缺口而非编造）。

## 2026-07-19 晚：index-f正式转正为index.html + KDP页补全 + 全屏样式统一

**背景**：index-f（分类展示版）经过多轮反馈迭代后，用户确认"现在使用的menu和布局可以了"，要求删除A-E对比版本，F转正为正式首页。

**做了什么**：
- `index-f.html` → 内容合并进 `index.html`，去掉COMPARE MODE横幅；`index-b/c/d/e.html`+旧`index-f.html`已删除
- 6个新页面（updates/whats-next/stories/knowledge-*）里所有`index-f.html`链接改成`index.html`
- 首页"电商直销平台"卡片改成直接外链`https://shop.maysuns.uk`（不再经过`product-shop.html`介绍页中转）
- `product-kdp.html`补全：从只显示1本书→显示2本真实已上架书籍（各自标题/简介/独立Amazon链接）+ 9本筹备中书目的一句话说明
- `assets/site.css`新增`overflow-x:hidden`全站防护（用户反馈"日语切不回中文+页面过宽"，本地未能复现，但加了这个防御性修复防止任何未知元素撑破横向宽度）
- 首页宽度限制彻底移除（之前680px→900px→1200px→1600px多次上调用户仍反馈有留白，这次改成只用`clamp()`响应式边距、不设固定上限）

**已知限制**：
- 13个其他页面（`about.html`/`portfolio.html`/11个`product-*.html`）当时仍是旧的4项导航，与新首页8项导航不一致——已派后台Agent同步中，完成后会在此追加记录
- "日语切不回中文"这个bug本地多次测试（桌面1440px+移动390px，index.html和product-kdp.html）均未复现，可能是浏览器缓存了修改前的旧页面（这次调试中确实遇到过一次真实的缓存导致"看起来像bug"的情况），也可能只在特定设备/页面触发，需要用户提供更多复现细节

## 2026-07-19 index-f导航重构：8项菜单+6个新页面

**背景**：`index-f.html`是尚未上线的候选首页草案（COMPARE MODE横幅下的一个版本，真正线上的还是`index.html`）。本次只在index-f草案范围内，把原来4项（首页/Portfolio/About/Contact）扁平菜单，改造成8项菜单（含AI知识库/AI产品/About Me三个下拉），并新建下拉指向的6个新页面。首页Hero区和分类卡片区（含Category 1的Claude Code/Codex/Kimi K3 CLI credit行）未改动。

**改动范围**：只改了`index-f.html`本身 + 全部新建页面，**没有**改动`index.html`/`about.html`/`portfolio.html`/任何`product-*.html`——这些页面仍是原来4项菜单，等用户确认F定稿后再统一推广。

**8项菜单结构**（复用`assets/site.css`里已有的`.nav-dropdown`系列样式，未新增CSS）：

| # | 中文 | 行为 |
|---|------|------|
| 1 | 首页 | → `index-f.html` |
| 2 | AI知识库▾ | 下拉：T00知识库 / RAG知识库 / 一般知识库 |
| 3 | 动态 | → `updates.html`（新建） |
| 4 | AI产品▾ | 下拉：AI工具集 / 一般工具集（均指向`portfolio.html`，避免死链接） |
| 5 | 游戏大厅 | → `product-games.html`（已存在） |
| 6 | Maysun商店 | → `product-shop.html`（已存在） |
| 7 | 未来展望 | → `whats-next.html`（新建） |
| 8 | About Me▾ | 下拉：我的琐事 / 关于我们（"About Me"三语都保留英文，按用户提供的对照表原样执行） |

**6个新页面 — 真实内容 vs 明确占位，逐一标注**：

- `updates.html` — 两个板块在一页：①「AI行业动态」**明确占位**（内容制作中）——去看过`PJ09_ai_news_search`（手动按钮触发的AI新闻搜索工具，未部署到公网，不是自动订阅源），确认目前没有可以真实展示的现成内容，因此没有编造新闻标题；②「更新日志」是**真实内容**——从本项目`OVERVIEW.md`过往章节摘取4条真实里程碑（本次导航重构本身、2026-07-19故事型首页改版、2026-07-19 Vultr迁移、2026-07-18多页化改版），带真实日期。
- `whats-next.html` — **真实内容**：一段坦诚的"还没定长期规划，但想继续做下去，可能发展成团队/公司"的说明（按用户原话精神撰写，未编造具体路线图）。Join/Follow区块4张卡片：Line群（**明确占位**，`href="#"`+"（准备中）"标签，点击不跳转）；微信群（**明确占位**，纯CSS占位图标框，不是伪造的二维码图片）；邮件订阅（**真实可用**，表单用`mailto:`+`enctype="text/plain"`兼容写法，提交会打开访客邮件客户端；HTML里加了注释说明以后可换成正式的Buttondown等工具，未接入未验证过的第三方服务）；GitHub Star/Watch（**真实**，链接到本站footer已经在用的`github.com/maysunai`真实组织）。
- `stories.html` — **明确占位**（用户原话"先占位置"）：只放了一张卡片"AI做院徽：失败又成功的故事"，1-2句悬念文案+"详细内容制作中"标记，没有编造具体的故事细节。
- `knowledge-t00.html` — **真实内容**：介绍T00是什么（个人AI协作框架，含请求/回复协议、记忆规则、项目组织规范），高层级描述，克制、不暴露具体规则文件内容，链接回`about.html#framework`。
- `knowledge-rag.html` — **真实内容**：RAG（检索增强生成）的简明科普，附带指向`product-rag.html`（已有产品页）作为真实落地案例。
- `knowledge-general.html` — **明确占位**：清楚标注"内容制作中"，列出计划涵盖的主题（Git基础、Python基础），没有编造教程内容。

**i18n**：新增81个三语翻译key（导航18个 + 6个新页面的标题/正文/表单文案），已用脚本核对全部81个key在`assets/i18n.js`里ja/en/zh三个语言块里各出现一次、共3次，无遗漏。

**产出/变更文件**：
- `F:\T00\PJ50_personal_website\index-f.html`（改）— 导航区块替换为8项+3个下拉
- `F:\T00\PJ50_personal_website\assets\i18n.js`（改）— 新增81个三语key
- `F:\T00\PJ50_personal_website\updates.html`（新建）
- `F:\T00\PJ50_personal_website\whats-next.html`（新建）
- `F:\T00\PJ50_personal_website\stories.html`（新建）
- `F:\T00\PJ50_personal_website\knowledge-t00.html`（新建）
- `F:\T00\PJ50_personal_website\knowledge-rag.html`（新建）
- `F:\T00\PJ50_personal_website\knowledge-general.html`（新建）
- `F:\T00\PJ50_personal_website\help_screenshots\*.png`（新建，共17张）— Playwright验证截图：index-f三个下拉展开状态（桌面中文×3 + 桌面英文×1 + 移动端菜单×1）、6个新页面各自的桌面(1440px)+移动(390px)全页截图（12张），每张均核对控制台0错误0警告

**已验证**：本地`python -m http.server 8090`直接复用了已在运行的实例；Playwright对全部7个受影响页面在1440px和390px两种宽度下截图，控制台消息数均为0（无JS错误/警告，含favicon请求在内也没有报错日志出现）；用grep核对了全部7个文件里的每个本地href都对应一个真实存在的文件，唯一的`href="#"`占位（Line群）有清晰的"（准备中）"标签且点击不跳转。

**已知限制/与原brief的偏差**（如实标注，未隐藏）：
1. 下拉箭头符号用了跟站内`index.html`已有下拉一致的`▾`字符，brief表格里写的是`▼`——为保持全站视觉一致性，采用了跟现有约定相同的符号，纯装饰性差异。
2. "AI产品"下拉的"AI工具集"和"一般工具集"两个子项按brief指示都指向了`portfolio.html`（避免死链接），目前还没有分别对应的独立页面区分"AI相关"和"通用"工具。
3. "关于我们"没有新建独立文件，直接复用已有的`about.html`（brief本身允许这样做）。
4. 本次改动**只影响`index-f.html`草案宇宙**，`index.html`（当前真正线上首页）、`about.html`、`portfolio.html`、全部`product-*.html`菜单均维持原状（仍是4项菜单），等用户确认F版定稿后需要另外一次改动把新菜单推广到全站。

---

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

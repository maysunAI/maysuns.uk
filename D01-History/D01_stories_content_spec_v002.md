# D01_stories_content_spec — `stories.html` 内容地图（v001）

> 用途：逐场景记录"现在长什么样、每处内容具体是什么"，作为以后改动的沟通媒介——想改某个场景时，直接在这份文档里找到对应段落改文字描述，告诉AI"按D01第X场景改"，不用每次口头重新描述一遍图片/场景细节。
> 跟`REQUIREMENTS.md`(要做什么)/`OVERVIEW.md`(做出了什么)/`DESIGN.md`(为什么这么设计)不是同一份文件，这份是"内容地图"，专门给`stories.html`这类内容密集的故事页用。
> **分工**：这份文档负责"内容+意图"这一层（文字、图片选择的理由、场景结构），不负责精确CSS数值（圆角/阴影/动画缓动曲线这些留给HTML/CSS本身，文档里不重复）。
> 版本管理：这是v001（2026-07-30，第15轮改动后的状态）。以后改动较大的一轮结束后，另存一份`D01_stories_content_spec_v002.md`（依次往下编号），旧版本不删，都留在本项目文件夹里，方便随时翻旧版本对比。

---

## 页面整体

- **URL**：`https://maysuns.uk/stories.html`（导航入口在"AI Knowledge ▾"下拉菜单里，2026-07-30第15轮从"About Me"移过来）
- **页面标题**：Stories（中文"幕后故事"，日文"エピソード"）
- **当前只有一个故事**："Jason如何用T00工作的一天"（"A Day With T00"），10个场景，用左侧圆形数字徽章（CSS counter自动编号）串成时间线
- **三语言**：日/英/中，文案在`assets/i18n.js`（对应`data-i18n`属性的key）
- **结尾**：一段免责声明（说明客户是虚构合成、但每个功能都真实存在）+ "Published"状态标签 + CTA按钮（链接回`index.html`）

---

## 场景1 — 9:00，"今天要做什么？"

- **标题**（`stories_t00day_s1_h`）：9:00 — "What's on today?"
- **正文**（`stories_t00day_s1_p`）：我问，T00答——待办清单自动跳出来，其中一条已经标出来了：客户发邮件要做网站，还有个会要开
- **布局**：两栏并排（问→答），中间一个箭头连接
  - 左栏：插画`man_computer.png`（男性用电脑，irasutoya风格单人插画）+ 一个"🕘 9:00"时钟徽章 + 一个对话气泡"Jason：T00，今天要做什么？"(`stories_t00day_s1_bubble`)
  - 右栏：一张米色卡片，内容：
    - 2行已读事项（未读邮件`s1_cap1`/项目截止日期`s1_cap2`，普通样式）
    - 1行高亮的新任务（📧 新任务：做网站+客户会议，`s1_cap3`，蓝底高亮）
    - 1行小字"🔍 直接从客户邮件里读到的"(`s1_frommail`)
    - 一个"要件定義"清单框：标题"📋 Requirements (from the client)"+4条（公司介绍页/产品介绍/联系方式/多语言支持，`s1_req1`~`s1_req4`）
    - 一个T00徽章（☀️图标+"T00"文字，深色药丸状）
- **场景注释**（`s1_pjnote`）：标注对应真实项目`PJ19_todolist_assistant`（这个故事启发了这个项目立项，不是虚构能力）

## 场景2 — Jason一句话，T00全接手

- **标题**（`s2_h`）：Jason gives the word, T00 takes it from there
- **正文**（`s2_p`）：一句话，引用客户邮件——T00接手剩下的全部：读邮件、定要件、建站
- **布局**：两栏并排（跟场景1同款结构）
  - 左栏：同一张`man_computer.png`插画 + 对话气泡"Jason：根据客户邮件的要求，试着做个网站吧"(`s2_me`)
  - 右栏：T00徽章 + 3行步骤回显："📧 读邮件"→"📋 定要件"→"🌐 建站"(`s2_step1`~`s2_step3`)
- 无场景注释（这一幕是场景1到场景3的过渡）

## 场景3 — 几分钟后，网站做好了

- **标题**（`s2b_h`）：A few minutes later, it's ready
- **正文**（`s2b_p`）：T00自己搞定了——已经上线在自己的网址上，符合每一条要求
- **布局**：三段叠加
  1. 虚线框进度框（`.st-workbox`，蓝色虚线边框）：标题"🔧 T00 is building it"+3条打勾进度（页面结构已生成/设计布局已应用/文案已填入，滚动到此处才播放逐条淡入动画）
  2. 左右两栏：左边是无人物的浏览器mockup（`.st-browser-mock`纯CSS画的，☀️ logo居中+"maySunAI — Homepage"站名+几条内容块）；右边是文件卡片"📄 requirements.md ✓ 符合全部4项"(`s3_filename`/`s3_filestatus`)
- **场景注释**（`s2b_pjnote`）：标注这是本站自己的"AI One-Shot App Generator"功能（T00框架的一部分，不是独立编号项目）

## 场景4 — 拜访客户

- **标题**（`s3c_h`）：Visiting the client
- **正文**（`s3c_p`）：网址在手——交换完名片，直接掏出电脑
- **布局**：单张真实插画`meishi_exchange.png`（irasutoya.com的"名刺交換"免费插画，两人交换名片场景），图片下方标注"illustration: irasutoya.com"
- 无场景注释

## 场景5 — 一起看网站

- **标题**（`s4_h`）：Reviewing the site together
- **正文**（`s4_p`）：手机上网站已经是最新的了——直接给人看，比口头描述更有效，具体反馈立刻就来
- **布局**：两栏+放大镜箭头
  - 左栏：插画`undraw_meeting.svg`（两人开会插画）+ 浮动对话卡片"让这个更突出一点"(`s4_cap1`)
  - 中间：🔍放大镜箭头
  - 右栏：浏览器mockup（跟场景3同款结构，`stories_t00day_s3_sitename`同一个i18n key），☀️ logo用金色圆环高亮（居中位置），下方文字标注"↑ this icon"(`s4_markerlabel`)——表示"讨论的就是这个icon的位置"
- 无场景注释

## 场景6 — 转发反馈，T00马上就改好

- **标题**（`s5_h`）：I forward the feedback — T00 already answers
- **正文**（`s5_p`）：一封邮件带着客户的意见，T00回复精确说明改了什么、改在哪
- **布局**：3段
  1. 一行过渡文字"📤 「这就让T00改」，然后直接发邮件"(`s4b_send`)
  2. 两栏真实邮件截图：`email_to_ai00.png`（发给AI00的请求邮件，标注"Sent to AI00"）+ `email_ai00_reply.png`（AI00处理完的回信，标注"AI00's reply — done"）——2026-07-29第十三次改动时把邮件里的真实邮箱换成了占位邮箱`jason@example.com`/`ai00@example.com`（修复过一次隐私泄漏）
  3. 两栏Before/After浏览器mockup对比：
     - **Before**（2026-07-30第15次改动后）：跟场景5右栏同款——金色圆环高亮的居中icon，**不带文字标注**（第15轮按用户要求去掉了"↑ this icon"这行字，两张图单纯靠icon位置本身对比，不需要文字辅助）
     - **After**：icon改成绝对定位在左上角（无高亮圆环），代表"已经改好了"
- **场景注释**（`s5_pjnote`）：标注对应真实项目`PJ14_email_agent`（邮件驱动任务执行，T00直接从邮件正文读取指令并原地回复）

## 场景7 — 第二轮反馈，这次更具体

- **标题**（`s6_h`）：Second look, more specific asks
- **正文**（`s6_p`）：再看一次网站——这次客户有具体的改动点了，不再是笼统的印象
- **布局**：单个虚线框文字说明（`.st-workbox`）：标题"🔁 Round 2: specific changes"(`s6_tag`) + 一句话"同一个画面，但这次是具体的指出点，不是笼统印象"(`s6_item1`)——2026-07-29第十三次改动去掉了插画（原来跟场景5重复用了`undraw_meeting.svg`），改成纯文字
- 无图片、无场景注释

## 场景8 — 再见

- **标题**（`s6b_h`）：See you later
- **正文**（`s6b_p`）：拿着笔记，该回去把这些改动做完了
- **布局**：单张真实插画`ojigi_bow.png`（irasutoya.com的"鞠躬告别"插画），标注"illustration: irasutoya.com"
- 无场景注释

## 场景9 — 回家后，把细节做对

- **标题**（`s7_h`）：Back home: the details get done right
- **正文**（`s7_p`）：早上的请求、当面的意见、路上的邮件——T00的req/reply记录把这些串成一条线，细节不会漏掉
- **布局**：
  1. 单张插画`man_computer.png`（2026-07-30第15轮从280px放大到380px），叠加T00徽章
  2. `.st-screen-mock`活体HTML组件（深色显示器边框造型），内容分三段（字号0.92em）：
     - 📌 Original request（黄色标签）：「1. 根据file.md文件修改一下细节」「2. 然后生成一份详细设计书」(`s7_sm_req1`/`req2`，2026-07-30第15轮改写，原内容是"icon居中→左上"，跟场景6重复了)
     - 🔎 Mapping（蓝色标签）：对应两条("file.md：修改细节"/"详细设计书：生成")
     - ✅ Answer（绿色标签）：两条"已完成"
  3. 文件卡片"📘 detailed-design.md ✓ Generated from today's requests"(`s7_filename`/`s7_filestatus`)——呼应上面req/reply里"生成详细设计书"这条
- 无场景注释（req/reply这个机制本身就是T00框架核心，不需要额外标注对应哪个PJ编号）

## 场景10 — 完成

- **标题**（`s8_h`）：Done
- **正文**（`s8_p`）：网站上线，客户满意，今天的待办清单又划掉一项
- **布局**：
  1. `.st-big-icon-scene`米色卡片：🎉大图标 + "本日分完了"标签(`s8_tag`)
  2. 两栏：左边聊天气泡"客户：感谢你们的完美工作，期待下次合作！"(`s8_praise`，2026-07-30第15轮改写，原文提到"打款"字样已删除)；右边真实插画`undraw_agreement.svg`（握手+签合同插画，2026-07-30第15轮复用了此前下载但一直没用上的素材）
- 结尾紧接免责声明+CTA，页面到此结束

---

## 用到的图片文件一览（`assets/illustrations/`）

| 文件名 | 用在场景 | 内容 | 来源 |
|---|---|---|---|
| `man_computer.png` | 1/2/9 | 单人男性用电脑（irasutoya风格） | 自制/下载素材 |
| `meishi_exchange.png` | 4 | 两人交换名片 | irasutoya.com（免费商用） |
| `undraw_meeting.svg` | 5 | 两人开会插画 | undraw.co |
| `email_to_ai00.png` | 6 | 发给AI00的请求邮件截图 | Playwright截图生成，内容为占位邮箱 |
| `email_ai00_reply.png` | 6 | AI00处理完的回信截图 | 同上 |
| `ojigi_bow.png` | 8 | 鞠躬告别 | irasutoya.com（免费商用） |
| `undraw_agreement.svg` | 10 | 握手+签合同 | undraw.co |

未使用的历史素材（曾经用过，现在的版本没有引用，保留文件不删）：`undraw_teamwork.svg`/`undraw_website.svg`/`undraw_mail_sent.svg`/`undraw_fixing_bugs.svg`/`undraw_celebration.svg`/`undraw_goodbye.svg`/`undraw_nice_to_meet_you.svg`/`reqreply_screenshot.png`。

---

## 改动方式提醒

- 改**文字内容**：找到对应场景的i18n key，去`assets/i18n.js`里搜索该key，三语言（日=第一段/英=第二段/中=第三段，每个key在文件里各出现3次）都要改。
- 改**图片**：说清楚"场景X的图片，换成/改成……"，直接对照上面的图片一览表。
- 改**布局/新增场景**：描述"在场景X和场景Y之间加一幕，内容是……"，或者"把场景X和场景Y合并"。
- 提到"详细设计书第X场景"，就是指这份文档里对应的`## 场景X`标题。

# T04 — AI 概念知识库（英日中三语言，术语表+发音）

> 立项：2026-07-30，来自用户 req 47-101 + 125（"这不是术语，也是一个知识库，马上做，从0到精通的程度"）
> 状态：已完成（2026-07-30 本地+生产环境验证通过，见下方"执行记录"）

## 需求原文（来自 temp01_req.md）

1. 现在t00有没有一个 英日中的 关于ai的html help
   - 有术语表，有发音
   - 这个文件最好能结合一些t00的内容
   - 是公开的，不能有个人隐私内容
   - 需要有 https://maysuns.uk/ 网址，作为钩子
   - 内容覆盖5个层级：
     - 基础层：LLM / Prompt / Context / Token / Model / Embedding
     - AI 开发能力/工具层：Skills / MCP / Tools / Function Calling / Harness / Memory / Rules / System Prompt
     - Agent 层：Agent / AI Agent / 智能体 / Planning / Tool Use / Workflow / Multi-Agent
     - 知识与应用层：RAG / Embedding / Vector Database / Local Knowledge Base / Document Search / LangChain / LangGraph / Agentic RAG
     - 最终应用：AI Assistant / Coding Agent / Research Agent / Customer Service Agent / Automation / Personal AI / 企业AI
2. 后续追加（req 125）："这不是术语，也是一个知识库，马上做。从0到精通的程度。"
   → 不是一份简单的名词解释表，每个概念要写到能让读者从零基础理解到能实际应用的深度（类似 mini 教程，不是一句话定义）。

## 判断与方案

- **格式**：沿用 R11 标准（`AI00_Common/rules/R11_html_help_standard.md`）的左侧菜单单文件HTML模板（`AI00_Common/_templates/mobile_help_template.html`），不是 PJ50 站内 `knowledge-*.html` 那种卡片列表风格——因为用户明确要求"术语表+发音"，这正是 R11 模板的招牌功能（🔊 按钮调用浏览器 TTS 朗读，不是音标/谐音）。
- **语言**：模板本身是单语言的，需要改造成内置 EN / 日本語 / 中文 三态切换（复用 PJ50 站内 `assets/i18n.js` 的语言按钮顺序：EN在前）。发音按钮要根据当前语言选择对应的 TTS voice/lang（en-US / ja-JP / zh-CN）。
- **文件位置与站内整合**：新建 `PJ50_personal_website/knowledge-ai-glossary.html`，站内页面统一走 `nav`+`site.css`+`i18n.js` 外壳（跟 `knowledge-t00.html` 等页面一致，保证语言切换、主题切换、导航跟全站一致），主内容区嵌入 R11 左侧菜单+术语卡片结构。
- **导航入口**：在全站导航 "AI Knowledge ▾" 下拉菜单新增一项链接过去。
- **maysuns.uk 钩子**：页面顶部/底部注明"由 maysuns.uk 制作"+链接回首页。
- **结合 T00 内容**：适用的术语（Skills / MCP / Tools / Memory / Rules / System Prompt / RAG / Local Knowledge Base 等）在解释后附一行"T00 中的例子"，链接到 `knowledge-t00.html` 或具体产品页（如 `product-rag.html`）。
- **深度**：每个术语按"是什么 → 为什么重要 → 一个具体例子 → 常见误区/跟相邻概念的区别"四段式写，不是一行定义。
- **公开安全**：不出现真实邮箱/服务器IP/内部文件路径等隐私信息。
- **准确性**：MCP / Agentic RAG / LangGraph 等较新/易混淆的术语，写之前用 WebSearch 核实定义，不凭印象瞎写。

## 执行记录

- 2026-07-30：任务拆分完成，已派子Agent（general-purpose）执行首版内容+页面搭建。
- 2026-07-30：子Agent完成交付。
- 2026-07-30：用户反馈内容定位问题（本质是AI/T00通用知识，不该归在PJ50这个具体项目下），提问确认后用户选择"保持现状（推荐）"——`knowledge-ai-glossary.html`继续留在`PJ50_personal_website/`作为maysuns.uk正式页面，不迁移到`AI00_Common/`。此问题已解决。新建`PJ50_personal_website/knowledge-ai-glossary.html`，5层级共31个术语（基础层6/开发能力工具层6/Agent层5/知识与应用层7+Embedding跨层链接/最终应用层7），每条EN/JA/ZH三语言写满"是什么→为什么重要→具体例子→常见误区"四段式，未偷工减料。适用术语附"T00中的例子"链接到`knowledge-t00.html`/`product-rag.html`/`knowledge-rag.html`（已核实这些页面存在且相关）。🔊发音按钮用`speechSynthesis`朗读，语言跟随`document.documentElement.lang`（由全站`main.js`的`setLanguage()`维护），未新建独立语言切换器。页面顶部+底部各有一处"Made by maySunAI — maysuns.uk"钩子，链接`https://maysuns.uk/`绝对地址。全站27个html文件的"AI Knowledge ▾"下拉菜单新增入口，改动前备份到`Z01_backup_20260730c/`。
  - **WebSearch核实的3个术语**：MCP（确认为Anthropic 2024年底推出的开放标准，2025年12月捐给Linux基金会Agentic AI Foundation）、Agentic RAG（确认核心区别是Agent自主判断检索时机/次数/是否足够，而非固定单次检索）、LangGraph（确认是LangChain团队做的显式图状态机库，专解决循环/分支/持久状态；纠正了搜索结果里"low-code可视化"这个不准确的形容——LangGraph本质是代码库）。三条内容里各自注明"已在撰写时通过网络搜索核实"。
  - **判断call**：31个术语三语言正文（约2万字）没有塞进全站共享`assets/i18n.js`（避免所有27+页面都多背这份重量），改为页面自己的`GK_TERMS`对象+`gkOnLangClick()`包装函数（内部仍调用真正的全局`setLanguage()`，保证语言切换行为跟全站一致）。只有导航/页脚等小字符串按标准写法进了`i18n.js`。
  - **开发中发现并修复的2个真bug**：①`site.css`通用规则`nav{display:flex}`意外套用到自己的`<nav id="gkMenu">`侧边菜单标签上，导致菜单项挤成横向一排——加`#gkMenu{display:block}`覆盖修复；②中文正文最初用了跟JS字符串定界符冲突的直排英文引号`"..."`，导致63处语法错误——写脚本统一换成中文弯引号，`node --check`验证通过。
  - **验证**：Playwright本地+生产环境双重验证，桌面1400×900+手机390×844，控制台0报错（除favicon 404），术语切换/语言切换/🔊发音/搜索框/移动端独立抽屉菜单（跟站点nav汉堡菜单id和z-index都不冲突）全部实测通过，手机端无横向溢出。部署后27个改动文件+新页面+i18n.js逐个curl确认200，生产环境`https://maysuns.uk/knowledge-ai-glossary.html`截图核对渲染正确。详细变更记录见`PJ50_personal_website/CLAUDE.md`"第二十三次"条目。

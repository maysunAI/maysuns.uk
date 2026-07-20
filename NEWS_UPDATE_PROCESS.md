# updates.html「AI行业动态」更新流程（定式）

> 目的：每次更新用差不多的方式做，覆盖期从上次结束的地方继续，内容精选不贪多。

## 覆盖期规则

- `updates.html` 的"AI行业动态"区块顶部有一行"最后更新：YYYY-MM-DD"（对应`upd_news_coverage`翻译key）。
- 下次更新时，从这个日期开始往后搜索新内容，不用重新搜一遍更早的旧闻。
- 更新完成后，把这行日期改成本次更新的日期。

## 四个固定分类 + 对应搜索方式

| 分类 | 对应i18n前缀 | 搜索关键词模板 |
|------|------------|---------------|
| Claude | `upd_news_claude_*` | `Anthropic Claude [最新版本名] launch [年份]` |
| Codex | `upd_news_codex_*` | `OpenAI Codex update [月份] [年份]` |
| 其他AI编程工具 | `upd_news_othercoding_*` | `[Kimi/Cursor/Gemini CLI等] coding CLI update [年份]`（跟首页"Learn by building with"工具条保持一致，目前是Kimi K3 CLI） |
| 其他AI动态 | `upd_news_otherai_*` | `major AI industry news [月份] [年份]`，从结果里挑一条最有分量、来源可靠的 |

## 精选原则（内容不在多，在于精）

- 每个分类**只放1条**（最多2条），不要堆砌
- 优先选官方信息源（公司自己的news/blog/changelog页面），其次才是可信媒体报道；避免SEO内容农场类文章
- 每条必须有：标题（一句话）、一句话说明、发生日期、来源链接（`target="_blank"`）
- 日期必须是**搜索结果里明确写出来的真实日期**，不能是我自己推算/编的

## 具体操作步骤

1. 用WebSearch，按上表四个分类分别搜索
2. 每个分类选1条最有代表性/信息量最大的结果，优先选查得到官方来源链接的
3. 把标题/说明/日期/来源链接翻译成中日英三语，写进`assets/i18n.js`对应的`upd_news_*_title/body/date/source`几个key（三语都要改，形如`upd_news_claude_title`）
4. 更新HTML里的`href`（来源链接）和`upd_news_coverage`的日期
5. 旧的一批内容不用保留历史（这个区块本来就是"当前精选"，不是新闻归档），直接覆盖

## 首次执行记录

- 日期：2026-07-20
- 覆盖：知识截止(2026年1月)到2026-07-20之间的精选高信号事件（不是逐日全量搜集，是挑重点）
- 选中的4条：Claude Sonnet 5发布(06-30)、Codex并入ChatGPT桌面应用(07-09)、Kimi K3发布(07-16)、GPT-5.6正式上线(07-09)

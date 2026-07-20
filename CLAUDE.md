# PJ50_personal_website（原PJ44_personal_website）— maysuns.uk 个人网站

> 立项时间：2026-06-13
> 状态：开发中
> 域名：maysuns.uk（Cloudflare DNS）

## 定位

Jason / maySunAI 的个人品牌网站。宣传 T00 开发框架 + 展示产品。

## 产品列表

- MD Markdown Reader（PJ25，原PJ42）— 网页版已上线 reader.maysuns.uk，Google Play 尚未提交
- 吃药提醒 App（PJ20）— 开发中
- MyAI 个人AI助手平台（PJ90）— 开发中，2026-07-16加入Portfolio
- Product Shop 商品直销平台（PJ23）— 已上线 shop.maysuns.uk，2026-07-16加入Portfolio并附真实链接
- 更多产品陆续上线

## 技术方案

- 纯 HTML + CSS（无框架）
- Vultr 服务器托管（167.179.106.32，跟 report/shop/memo/reader/games 同台），2026-07-19 从 GitHub Pages 迁移过来
- Cloudflare DNS 绑定 maysuns.uk（A记录直接指向服务器IP）
- GitHub仓库（`github.com/maysunAI/maysuns.uk`）仍保留作为版本历史/备份，但不再是实际托管源

## 文件结构（2026-07-18 改为多页站，不再是单文件）

```
PJ50_personal_website/
  index.html                    ← 首页（产品作品集总览+导航）
  about.html                    ← 关于我（履历+T00框架+投资人区块，含原"团队"信息）
  product-*.html                ← 10个产品各自独立详情页
  assets/
    site.css                    ← 全站共享样式
    i18n.js                     ← 全站共享三语翻译字典（ja/en/zh，日语默认第一）
    main.js                     ← 语言切换+主题切换共享逻辑
  help_screenshots/             ← Playwright验证截图
  CLAUDE.md / REQUIREMENTS.md / OVERVIEW.md
```

语言切换按钮顺序固定为：日本語 / EN / 中文（中文不在第一位，默认语言为英文，除非浏览器语言/localStorage另有设定）。

## 部署步骤（2026-07-19起）

1. 本地改完文件，`git commit` + `git push`（保留版本历史，仓库地址见上）
2. 把改动的文件上传到服务器：
   ```
   scp -i ~/.ssh/pj23_vultr_deploy -r <改动的文件> root@167.179.106.32:/var/www/pj50-website/
   ```
3. 纯静态文件，nginx 直接生效，不需要重启/重新构建任何东西
4. nginx配置：`/etc/nginx/sites-enabled/maysuns.uk`；证书：Let's Encrypt（`certbot`管理，自动续期，到期日2026-10-17）

⚠️ 旧的 GitHub Pages（Settings→Pages custom domain功能）已停用（DNS不再指向它），但没有主动关闭，仓库本身的 `CNAME` 文件已在服务器版本里删除（服务器不需要它，GitHub仓库里如果还留着不影响，纯历史遗留）。

## 本地预览规则（2026-07-20新增）

给用户本地预览链接时（`python -m http.server` 等），**每次改完东西重新起服务器都要换一个新端口**，把新的 `http://127.0.0.1:新端口/xxx.html` 链接告诉用户，不要一直用同一个旧端口/旧链接。
- 原因：用户反馈"总是确认的是旧版本"——同一个端口/URL容易被浏览器缓存旧内容，换新端口能保证用户点开的一定是最新文件，不用靠用户自己清缓存/硬刷新。
- 每次给新链接前，先确认旧的本地服务器进程已经关掉（避免残留进程占用旧端口继续提供旧内容）。

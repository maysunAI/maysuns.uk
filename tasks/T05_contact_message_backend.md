# T05 — 留言板功能（自建后端 + contact.html/contact-admin.html）

> 立项：2026-07-30，用户要求把footer的`mailto:`邮件链接换成真实的站内留言功能
> 状态：已完成（2026-07-30 本地+生产环境端到端验证通过，见下方"验证记录"）

## 需求

用户明确要求：footer的"✉️ Email"（`mailto:`链接）换成真实的、能实际工作的"留言板"功能。被问到"自建后端 vs 第三方表单服务（如Formspree/Netlify Forms）"时，选择了**自建后端，理由"更可控"**。

## 技术方案

### 后端：`pj50-backend`

- 位置：服务器 `/var/www/pj50-backend/`（Vultr `167.179.106.32`，跟`pj02/pj08/pj18/pj20/pj22/pj23-backend`同台）
- 端口：**5150**（部署前用`ss -tlnp | grep node`现查确认空闲）
- 代码风格：Express + ESM（`"type":"module"`），跟`pj20-backend`/`pj23-backend`同款写法
- PM2：`pm2 start server.js --name pj50-backend`（`pm2 list`确认`online`）
- 环境变量（`/var/www/pj50-backend/.env`，**不在版本库里**）：
  - `PORT=5150`
  - `ADMIN_PASSWORD=<真实随机密码，已生成并写入服务器，未记录在本文件/仓库任何地方>`
  - `ALLOWED_ORIGIN=https://maysuns.uk`
  - `NOTIFY_TO_EMAIL=gao616188@gmail.com`
  - （可选）`RESEND_API_KEY`/`RESEND_FROM_EMAIL`——**目前未配置，见下方"邮件通知现状"**
- 本地源码副本：本次部署时在本地临时目录构建+测试后scp上去，仓库里没有单独保留一份`pj50-backend/`源码目录（这点跟`PJ20`/`PJ23`把后端源码放进各自PJ文件夹的做法不同——**如果以后要改这个后端代码，需要SSH直接改服务器上的文件，或者告诉AI"帮我把pj50-backend代码同步一份到本地方便改"**，目前没有本地-服务器双向同步机制）。

### API

- `POST /api/message`：body `{name?, contact?, message, hp?}`
  - `message`必填，trim后1-2000字符
  - `hp`（前端字段名`website`，蜜罐）非空 → 静默丢弃（不存/不计限流/不发邮件），仍返回`{ok:true}`
  - 按IP每小时最多5条被接受的留言，超限返回HTTP 429 `{ok:false,error:"rate_limited"}`
  - 通过校验的留言追加写入 `/var/www/pj50-backend/messages.jsonl`（一行一个JSON：timestamp/name/contact/message/ip）
- `POST /api/messages/list`：body `{password}`，校验`ADMIN_PASSWORD`（常数时间比较），通过后返回`messages.jsonl`全部内容（倒序，最新在前）
  - 用POST不用GET+querystring，避免密码留在nginx/浏览器历史记录里

### 怎么看留言（给Jason）

1. 打开 `https://maysuns.uk/contact-admin.html`（这个页面不在任何导航菜单里，需要记住URL）
2. 输入密码（存在服务器 `/var/www/pj50-backend/.env` 的 `ADMIN_PASSWORD`，SSH进服务器`cat .env`能看到）
3. 也可以直接SSH看原始文件：`ssh -i ~/.ssh/pj23_vultr_deploy root@167.179.106.32 "cat /var/www/pj50-backend/messages.jsonl"`

### nginx

- `/etc/nginx/sites-enabled/maysuns.uk` 新增：
  ```
  location /api/ {
      proxy_pass http://127.0.0.1:5150;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }
  ```
- 顶部注释从"纯静态，无后端"改成反映真实现状
- 改动前`cp`了带日期的备份，`nginx -t`验证通过才`systemctl reload nginx`

### 前端

- `contact.html`——公开留言表单页，footer链接（`footer_contact`）从`mailto:`改指向这里
- `contact-admin.html`——密码保护的查看页，`<meta name="robots" content="noindex">`，不在任何nav菜单里
- `assets/i18n.js`新增 `contact_*` 前缀共18个key，EN/日本語/中文三语言真实译文
- 全站29个html文件的footer链接批量替换（`mailto:j6016086@gmail.com` → `contact.html`），改动前备份到 `Z01_backup_20260730e/`

## 邮件通知现状（诚实说明，不要假设它能用）

新增了 `emailSender.js`（照抄 `pj23-backend/emailSender.js` 的Resend调用模式），收到新留言时**尝试**发提醒邮件到 `gao616188@gmail.com`。

**截至部署时，这一层不会真的送达邮件**——已逐个检查过服务器上pj02/pj08/pj18/pj20/pj22/pj23-backend的`.env`，没有一个配置过真实`RESEND_API_KEY`，这个新后端同样没配。缺少这个环境变量时，代码会打日志跳过发送，不报错、不影响留言本身已经落盘。

**要让邮件通知真正工作，需要**：
1. Jason在 [resend.com](https://resend.com) 注册账号，拿到 `RESEND_API_KEY`
2. SSH进服务器，把key填进 `/var/www/pj50-backend/.env` 的 `RESEND_API_KEY=...`
3. `pm2 restart pj50-backend` 让新环境变量生效

在此之前，**看留言的唯一方式是打开`contact-admin.html`或SSH直接看`messages.jsonl`**，不会有任何自动通知。

## 验证记录（2026-07-30）

- 本地：`node --check`全部新增JS文件通过；本地起服务真实`curl`验证——正常留言存入`messages.jsonl`✅、蜜罐命中静默丢弃且未落盘✅、错误密码拒绝✅、正确密码返回内容✅、空留言400✅、连续6次提交第6次429✅
- 生产环境真实端到端（不是纯代码审查）：
  - Playwright真实填表+提交 `https://maysuns.uk/contact.html`（姓名"Claude Code test"+真实留言文本）→ 页面显示绿色成功提示
  - SSH确认 `messages.jsonl` 里真实出现这条记录
  - 用真实密码在 `https://maysuns.uk/contact-admin.html` 成功取回并显示该留言；错误密码被正确拒绝
  - 蜜罐字段测试：`browser_evaluate`填入蜜罐字段后提交，客户端显示成功，但服务器日志确认"蜜罐字段命中，判定为bot，静默丢弃"，且未写入`messages.jsonl`
  - 限流测试：连续对生产环境发送真实请求，第6次返回HTTP 429
  - 桌面1400×900 + 手机390×844，EN/日本語/中文三语言，`scrollWidth`≤`innerWidth`无横向溢出，控制台0报错（除已知favicon 404）
  - nginx改动：`nginx -t`通过后才`reload`，reload后确认`index.html`/`portfolio.html`等既有页面仍200
  - 测试留言与限流状态在验证完成后已从服务器清空（`messages.jsonl`清空，`messages_ratelimit.json`重置），不留测试脏数据
- 截图：`help_screenshots/contact_desktop_en_20260730.png` / `contact_desktop_ja_20260730.png` / `contact_desktop_zh_20260730.png` / `contact_mobile_zh_20260730.png` / `contact_mobile_production_en_20260730.png` / `contact_admin_gate_local_20260730.png` / `contact_e2e_success_production_20260730.png` / `contact_admin_authenticated_production_20260730.png`

## 已知限制 / 未来可做（不在本次范围内）

- 没有本地-服务器双向代码同步机制（见上方"本地源码副本"说明）
- 邮件通知需要用户自己去resend.com注册拿key才会生效
- `contact-admin.html`没有做移动端专门优化（用户要求"不需要好看"，够用即可）
- 没有做留言的删除/标记已读等管理功能，纯粹是"看列表"
- 没有验证码/更强的反滥用机制，目前只有蜜罐字段+IP限流两层（对个人网站的量级应该够用）

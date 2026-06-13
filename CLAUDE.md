# PJ44_personal_website — maysuns.uk 个人网站

> 立项时间：2026-06-13
> 状态：开发中
> 域名：maysuns.uk（Cloudflare DNS）

## 定位

Jason / maySunAI 的个人品牌网站。宣传 T00 开发框架 + 展示产品。

## 产品列表

- MD Markdown Reader（PJ42）— Google Play 审核中
- 吃药提醒 App（PJ20）— 开发中
- 更多产品陆续上线

## 技术方案

- 纯 HTML + CSS（单文件，无框架）
- GitHub Pages 托管
- Cloudflare DNS 绑定 maysuns.uk

## 文件结构

```
PJ44_personal_website/
  index.html        ← 主页（单文件网站）
  CLAUDE.md
```

## 部署步骤

1. 完成 index.html
2. 推送到 GitHub（github-pub 仓库或新建）
3. 开启 GitHub Pages
4. Cloudflare DNS：CNAME maysuns.uk → xxx.github.io

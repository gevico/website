# 格维开源社区官网

简洁的 GTOC 中英文单屏官网，使用原生 HTML / CSS / JavaScript 与 Vite 构建。

## 本地开发

```sh
npm install
npm run dev
```

## 构建与预览

```sh
npm run build
npm run preview
```

构建产物为 `dist/`，可部署至静态网站托管服务。默认部署在域名根路径；子路径部署时设置 Vite 的 `--base` 参数。

## GitHub Pages

- 线上首页：https://gevico.github.io/website/
- 中文：https://gevico.github.io/website/?lang=zh
- 英文：https://gevico.github.io/website/?lang=en
- 部署流程：`.github/workflows/deploy-pages.yml`

GitHub Pages 使用 GitHub Actions 作为发布来源。推送到 `main` 或手动运行工作流后，使用 Node.js 24 和 `npm ci` 安装锁定依赖，构建并发布 `dist/`。构建阶段从 Pages 配置读取实际路径，因此默认的 `/website/` 子路径和后续配置的自定义域名均可使用。

本地复现项目路径下的生产构建：

```sh
npm ci
npm run build -- --base /website/
npm run preview -- --base /website/
```

部署不需要额外配置密钥；工作流使用 GitHub 内置令牌，只有部署任务拥有 Pages 写入和身份令牌权限。

## 中英文版本

- 中文：`/?lang=zh`
- 英文：`/?lang=en`
- 顶部语言按钮即时切换，更新页面标题、描述、导航、正文和无障碍标签。
- URL 指定语言优先；未指定时读取上次选择，首次默认中文。禁用本地存储时仍可正常切换。
- 中文文案在 `index.html`，英文翻译在 `src/i18n.js`。
- 中英文均使用透明 Logo 与单行「GEVICO」字标，不显示第二行小字。
- Slogan：格物致知，多维创新 / Explore the fundamentals. Innovate across dimensions.

## 页面与维护

页面只包含顶部导航、品牌首屏和简短页脚，不展示项目列表或额外内容区。

- QQ 群、Telegram、哔哩哔哩、微信公众号、博客及 GitHub 链接：`index.html`
- 图标与手机导航：`src/main.js`
- 蓝青背景光晕、响应式布局与减少动态效果支持：`src/style.css`
- 透明 Logo：`public/assets/gevico-logo-transparent.svg`，仅从官方原图移除白色背景矩形，图形和配色保持不变。
- 官方原始 Logo：`public/assets/gevico-logo.svg`

字体使用 Noto Sans SC，提供系统中文字体回退。核心页面和语言切换不依赖外部 API。

## 资料来源

资料核对日期：2026-09-28。

- 社区：https://github.com/gevico
- 社区链接：https://github.com/gevico/.github/blob/main/profile/README.md
- 博客仓库：https://github.com/gevico/blogs
- Logo：https://github.com/gevico/logos/blob/main/v1/logo.svg
- Logo 许可：Apache-2.0，原始许可保存在 `public/assets/LOGO-LICENSE`
- 背景原图：https://github.com/gevico/gtoc-forum/blob/main/asserts/head.png
- 视觉参考：https://forum.gevico.online/

哔哩哔哩链接为组织首页提供的社区主理人账号。微信链接保留文章专辑标识，去除会话和追踪参数。

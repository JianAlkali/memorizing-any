# 自助记运行说明

这是一个本地优先的 AI 记忆卡片与复习应用，面向用户直接下载体验。

## 快速运行

```powershell
npm install
npm run dev
```

打开终端显示的本地地址即可体验。

## 构建静态版本

```powershell
npm run build
npm run preview
```

构建产物位于 `dist` 目录，可部署到个人网站。

## 打包发布 Zip

```powershell
npm run pack:dist
```

会生成 `zizhuj-memory-dist.zip`，里面是可部署的静态站点文件。上传到个人网站时，通常上传 `dist` 目录内容或这个 zip 解压后的内容。

## 模型接口说明

- 默认不需要任何密钥，可使用临时离线方案体验核心流程；真实学习内容建议接入模型生成。
- 设置页内置多个常用模型预设，也支持自定义兼容 OpenAI Chat Completions 的接口地址和模型名。
- 访问令牌只保存在浏览器 localStorage，不写入导出的记忆数据；用户可以在设置页覆盖或删除。
- 如果部署到公开网站，建议使用服务端代理调用模型，避免在前端暴露密钥。

## 开发版、体验数据和发布版的关系

- 你在浏览器里操作产生的卡片、项目、问候等数据，保存在浏览器 localStorage/sessionStorage 中，不会写进代码仓库。
- `npm run dev` 的本地开发服务只是读取当前代码并在浏览器展示，体验时产生的数据不会影响将来发给别人的发布包。
- 如果想清空自己的体验数据，可以在浏览器开发者工具里清理本站点数据，或换一个浏览器/无痕窗口测试。
- 发布给用户时，应先运行 `npm run build` 或 `npm run pack:dist`，发布的是 `dist` 里的静态文件，不包含你本机浏览器里的体验数据。

## Git 管理建议

建议把源码纳入 Git，但不要提交：

- `node_modules/`
- `dist/`
- `.env` 或任何密钥文件
- 打包生成的 zip

本项目已配置 `.gitignore`。如需开始版本管理：

```powershell
git init
git add package.json package-lock.json index.html src README.md .gitignore 自助记-初赛作品帖草稿.txt
git commit -m "init zizhuj memory"
```

如果之后要做开发版和发布版，可以用：

- `main`：稳定发布版
- `dev`：日常开发版

也可以先只用一个分支，每次确认可用后再打包。

## 已实现功能

- 项目记忆与零散记忆
- 页面内项目创建表单，无浏览器 prompt 依赖
- 知识卡片生成与查看
- 单选、填空、简答题复习
- 确定 → 显示结果/解析 → 记录并下一题的分阶段复习流程
- 正确、半对、不对、太难、太简单、不相关、复习但不计入
- 每个知识点独立复习时间
- Markdown + LaTeX 渲染
- 本地缓存与数据导出
- 多模型 API 预设
- 每日问候：默认问候 / AI 个性化问候 / 近一周去重记录
- 无 API Key 首次显式提醒
- 结构化 JSON 校验、AI JSON 修复与模型失败重试

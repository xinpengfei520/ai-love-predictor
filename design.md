# AI Love Predictor 项目设计文档

## 项目概述
这是一个基于 Next.js 框架开发的 AI 爱情预测应用。项目采用现代前端技术栈，使用 TypeScript 确保代码类型安全，Tailwind CSS 实现响应式设计。

## 技术栈
- **框架**: Next.js 15.1.0
- **语言**: TypeScript
- **UI框架**: React 19
- **样式方案**: Tailwind CSS
- **代码规范**: ESLint
- **包管理**: npm/yarn
- **构建工具**: Turbopack

## 目录结构
```
.
├── src/                      # 源代码目录
│   └── app/                  # Next.js App Router 目录
│       ├── page.tsx         # 首页组件
│       ├── layout.tsx       # 全局布局组件
│       └── globals.css      # 全局样式
├── public/                   # 静态资源目录
├── node_modules/            # 依赖包
├── package.json             # 项目配置和依赖
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.ts       # Tailwind 配置
├── next.config.ts           # Next.js 配置
├── postcss.config.mjs       # PostCSS 配置
└── eslint.config.mjs        # ESLint 配置
```

## 开发规范
1. 使用 TypeScript 进行开发，确保类型安全
2. 使用 ESLint 进行代码规范检查
3. 使用 Tailwind CSS 进行样式开发
4. 遵循 Next.js App Router 的文件路由约定

## 开发环境
- 本地开发使用 `npm run dev` 启动，支持热更新
- 默认运行在 http://localhost:3000

## 构建部署
- 构建命令：`npm run build`
- 生产环境启动：`npm run start`
- 推荐使用 Vercel 平台进行部署

## 注意事项
1. 项目使用 App Router 而不是 Pages Router
2. 使用 Turbopack 作为开发服务器
3. 集成了 Geist 字体优化
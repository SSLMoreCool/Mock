# 尚品汇 - Vue 电商平台

尚品汇是一个基于 Vue 3 + Vite 的前端电商平台项目，包含完整的购物流程。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router 4** - 前端路由管理
- **Pinia** - 状态管理
- **Axios** - HTTP 请求库
- **Less** - CSS 预处理器
- **Mock.js** - 数据模拟
- **NProgress** - 页面加载进度条
- **Vite** - 构建工具

## 功能模块

- 🏠 **首页** - 轮播图、商品分类导航、楼层展示、品牌推荐
- 🔍 **搜索** - 商品搜索、筛选、排序、分页
- 📦 **商品详情** - 图片浏览、规格选择、加入购物车
- 🛒 **购物车** - 商品管理、数量修改、结算
- 💳 **订单** - 地址选择、订单确认、在线支付
- 👤 **个人中心** - 订单管理
- 🔐 **登录/注册** - 用户认证

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
src/
├── api/            # API 接口封装
├── assets/         # 静态资源
├── components/     # 公共组件
│   ├── Header/     # 头部导航
│   ├── Footer/     # 底部信息
│   ├── TypeNav/    # 三级分类导航
│   └── Carousel/   # 轮播图组件
├── mock/           # Mock 数据
├── pages/          # 页面组件
│   ├── Home/       # 首页
│   ├── Search/     # 搜索页
│   ├── Detail/     # 商品详情
│   ├── ShopCart/   # 购物车
│   ├── Trade/      # 订单确认
│   ├── Pay/        # 支付页
│   ├── Center/     # 个人中心
│   ├── Login/      # 登录
│   └── Register/   # 注册
├── router/         # 路由配置
├── store/          # Pinia 状态管理
├── App.vue         # 根组件
└── main.js         # 入口文件
```

## API 说明

项目使用了两套请求方式：
- **真实接口** (`/api`) - 代理到后端服务器 `gmall-h5-api.atguigu.cn`
- **Mock 接口** (`/mock`) - 使用 Mock.js 模拟的本地数据（轮播图、楼层等）

## License

[MIT](./LICENSE)
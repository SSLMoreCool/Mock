import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/search/:keyword?',
    name: 'Search',
    component: () => import('@/pages/Search/index.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/detail/:skuId',
    name: 'Detail',
    component: () => import('@/pages/Detail/index.vue'),
    meta: { title: '商品详情' }
  },
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component: () => import('@/pages/AddCartSuccess/index.vue'),
    meta: { title: '添加购物车成功' }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('@/pages/ShopCart/index.vue'),
    meta: { title: '购物车' }
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/pages/Trade/index.vue'),
    meta: { title: '结算' }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/pages/Pay/index.vue'),
    meta: { title: '支付' }
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/pages/Center/index.vue'),
    meta: { title: '个人中心' },
    children: [
      {
        path: 'myorder',
        name: 'MyOrder',
        component: () => import('@/pages/Center/MyOrder/index.vue')
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue'),
    meta: { title: '登录', hideHeaderFooter: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register/index.vue'),
    meta: { title: '注册', hideHeaderFooter: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title ? `${to.meta.title} - 尚品汇` : '尚品汇'
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

import { request, mockRequest } from './request'

// ===== 首页相关接口 =====

// 获取商品分类列表
export const reqCategoryList = () => request.get('/product/getBaseCategoryList')

// 获取首页轮播图（Mock）
export const reqBannerList = () => mockRequest.get('/banner')

// 获取首页楼层数据（Mock）
export const reqFloorList = () => mockRequest.get('/floor')

// ===== 搜索相关接口 =====

// 搜索商品信息
export const reqSearchInfo = (params) => request.post('/list', params)

// ===== 详情相关接口 =====

// 获取商品详情
export const reqDetailInfo = (skuId) => request.get(`/item/${skuId}`)

// 添加/更新购物车
export const reqAddOrUpdateCart = (skuId, skuNum) =>
  request.post(`/cart/addToCart/${skuId}/${skuNum}`)

// ===== 用户相关接口 =====

// 获取验证码
export const reqGetCode = (phone) => request.get(`/user/passport/sendCode/${phone}`)

// 用户注册
export const reqRegister = (data) => request.post('/user/passport/register', data)

// 用户登录
export const reqLogin = (data) => request.post('/user/passport/login', data)

// 获取用户信息（token验证）
export const reqUserInfo = () => request.get('/user/passport/auth/getUserInfo')

// 退出登录
export const reqLogout = () => request.get('/user/passport/logout')

// ===== 购物车相关接口 =====

// 获取购物车列表
export const reqCartList = () => request.get('/cart/cartList')

// 删除购物车商品
export const reqDeleteCart = (skuId) => request.delete(`/cart/deleteCart/${skuId}`)

// 切换商品选中状态
export const reqUpdateChecked = (skuId, isChecked) =>
  request.get(`/cart/checkCart/${skuId}/${isChecked}`)

// ===== 订单相关接口 =====

// 获取订单交易页信息
export const reqTradeInfo = () => request.get('/order/auth/trade')

// 提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)

// 获取支付信息
export const reqPayInfo = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`)

// 查询支付状态
export const reqPayStatus = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取我的订单列表
export const reqMyOrderList = (page, limit) =>
  request.get(`/order/auth/${page}/${limit}`)

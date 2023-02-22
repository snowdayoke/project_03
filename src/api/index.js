// 当前这个模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax'

// 三级联动接口: /api/product/getBaseCategoryList  get 无参数

// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起Ajax请求
// 发请求:axios发请求返回的结果是Promise对象
// 1.获取三级分类列表数据
export const reqCategoryList = ()=>
    requests({url:'/api/product/getBaseCategoryList', method:'get'})

// 2.获取Home首页轮播图banner数据
export const reqGetBannerList = ()=>mockRequests.get('/banner',)

// 3.获取floor数据
export const regGetFloorList = ()=>mockRequests.get('/floor')

// 获取search模块数据 地址/api/list  请求方式：post 参数：需要带参数
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */
//4.当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({
    url:'/api/list',
    method:'post',
    data:params
})

// 5.获取产品详情信息的接口  URL:/api/item/{ skuId }  请求方式：get
export const reqGetGoodInfo = (skuId) =>requests({
    url: `/api/item/${skuId}`,
    method:'get'
})

// 6..添加到购物车(对已有物品进行数量改动)   /api/cart/addToCart/{ skuId }/{ skuNum }  请求方式：post
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/api/cart/addToCart/${skuId}/${skuNum} `,
    method:'post'
})

// 7.获取购物车列表    /api/cart/cartList  请求方式：get
export const reqShopCart = ()=>requests.get('/api/cart/cartList')

// 8.删除购物车商品  /api/cart/deleteCart/{skuId}  请求方式：delete
export const reqDeleteCartById = (skuId)=>requests({url:`/api/cart/deleteCart/${skuId}`,method:'delete'})
 
// 9.勾选商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}  请求方式：get
export const reqCheckCartById = (skuId,isChecked)=>requests({
    url:`/api/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

// 10.获取验证码    /api/user/passport/sendCode/{phone}  请求方式：get
export const reqGetCode = (phone)=>requests({url:`/api/user/passport/sendCode/${phone}`,method:'get'})

// 11.注册用户  /api/user/passport/register   请求方式：post
export const reqUserRegister = (data) =>requests({url:'/api/user/passport/register',method:'post',data})

// 12.用户登录   /api/user/passport/login   请求方式：post
export const reqUserLogin = (data)=>requests({url:'/api/user/passport/login',method:'post',data})

// 13.获取用户信息【带着用户的token向服务器要用户信息】   /api/user/passport/auth/getUserInfo  请求方式：get
export const reqGetUserInfo = ()=>requests({url:'/api/user/passport/auth/getUserInfo',method:'get'})

// 14.退出登录 /api/user/passport/logout  请求方式：get
export const reqLogout = ()=>requests({url:'/api/user/passport/logout',method:'get'})

// 15.获取用户地址信息  /api/user/userAddress/auth/findUserAddressList 请求方式：get
export const reqUserAddress = ()=>requests({url:'/api/user/userAddress/auth/findUserAddressList',method:'get'})

// 16.获取订单交易页信息   /api/order/auth/trade 请求方式：get
export const reqOrderInfo = ()=>requests({url:'/api/order/auth/trade',method:'get'})

// 17.提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}   请求方式：post
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})

// 18.获取订单支付信息   /api/payment/weixin/createNative/{orderId}  请求方式：get
export const reqPayInfo = (orderId)=>requests({url:`/api/payment/weixin/createNative/${orderId}`,method:'get'})

// 19.查询支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}  请求方式：get
export const reqPayStatus = (orderId)=>requests({url:`/api/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 20.获取我的订单列表   /api/order/auth/{page}/{limit}    请求方式：get
export const reqOrderList = (page,limit)=>requests({url:`/api/order/auth/${page}/${limit}`,method:'get'})

// 当前这个模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax'

// 三级联动接口: /api/product/getBaseCategoryList  get 无参数

// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起Ajax请求
// 发请求:axios发请求返回的结果是Promise对象
export const reqCategoryList = ()=>
    requests({url:'/api/product/getBaseCategoryList', method:'get'})

// 获取Home首页轮播图banner数据
export const reqGetBannerList = ()=>mockRequests.get('/banner',)

// 获取floor数据
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
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({
    url:'/api/list',
    method:'post',
    data:params
})
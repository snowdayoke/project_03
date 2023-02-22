// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
import routes from './routes'
// 引入store
import store from '@/store'

// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace


// 重写push|replace
// 第一个参数，告诉原来push方法，你往哪里跳转（传递哪些参数）
// call||apply区别
// 相同点：都可以调用函数，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject){
    if(resolve && reject)  {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject){
    if(reesolve && reject){
        originReplace.call(this, location, resolve,reject)
    } else {
        originReplace.call(this, location, ()=>{}, ()=>{})
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 代表滚动条在最上方
        return { y: 0 }
      },
})
// 全局守卫：前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由信息
    // from:可以以获取到你从哪个路由而来
    // next:next()放行函数；next(path)放行到指定的路由；next(false)中断当前的导航
    // 为了测试，先全部放行
    next()
    let token = store.state.user.token;
    let uname = store.state.user.userInfo.name;
    // 用户登录了
    if(token){
        // 已经登录了还想去登录/注册--不行
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            // 已经登陆了且拥有用户信息放行
            if(uname){
                next()
            }else{
                // 已经登陆了且没有用户信息
                // 在路由跳转之前获取用户信息，且放行
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效，重新登录
                    store.dispatch('logout')
                    next('/login')
                }
            }
        }
    }else{
        // 用户未登录，不能访问交易相关trade、支付相关pay paysuccess、用户中心center、跳转到登录页面
        if(to.path.indexOf('/trade') !=-1||to.path.indexOf('/pay') !=-1||to.path.indexOf('/center') !=-1) {
            next('/login?redirect=' + to.path)
        }else{
            // (home|search|shopcart) --放行
            next()
        }
    }
})




export default router
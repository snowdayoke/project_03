// 引入一级路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import  Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'



/* 
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */

export default [
    {
        path:'/home',
        component:()=>import ('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        name:'search',
        // 路由组件能不能传递props数据？
        // 布尔值写法：params。
        // ----若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Search组件
        // props:true
        // 对象写法:额外的给路由组件传递一些props数据
        // props:{a:1,b:2}
        // 函数写法：可以把params参数，query参数，通过props形式传递给路由组件
        props($route){
            return {
                keyword:$route.params.keyword,
                k:$route.query.k
            }
        }
    },
    {
        path:'/login',
        name:'login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    // 重定向：在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:'*',
        redirect:'/home'
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path=='/shopcart'){
                next()
            // 其他路由组件而来，停留在当前
            }else{
                next(false)
            }         
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去支付页面，必须是从交易页面来
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            // 重定向myorder
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
]
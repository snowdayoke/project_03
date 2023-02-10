import Vue from 'vue'
import App from './App.vue'
// 引入全局组件--三级联动组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
// 注册全局组件  （--参数1：全局组件的名字；参数2：哪一个组件）
Vue.component(TypeNav.name, TypeNav)
Vue.component('Carousel', Carousel)

Vue.config.productionTip = false
// 引入router路由
import router from './router'
// 引入vuex仓库
import store from '@/store'
// 引入mockServer.js   --mock数据
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'


new Vue({
  render: h => h(App),
  // 注册路由：底下的写法KV一致省略V，【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')

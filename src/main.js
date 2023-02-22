import Vue from 'vue'
import App from './App.vue'
// 引入全局组件--三级联动组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox} from 'element-ui'
// 统一引入api全部请求函数
import * as API from '@/api'

// 注册全局组件  （--参数1：全局组件的名字；参数2：哪一个组件）
Vue.component(TypeNav.name, TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination',Pagination)
Vue.component(Button.name,Button)   //element-ui注册方式一
Vue.prototype.$msgbox = MessageBox;   //element-ui注册方式二：写在原型上
Vue.prototype.$alert = MessageBox.alert;

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
import VueLazyload from 'vue-lazyload'
import Xz from '@/assets/1.jpg'
// 使用自定义插件
Vue.use(myPlugins,{
  name:'upper'
})
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:Xz
})

// 引入表单校验插件 vee-validate  [只需引入，里面插件执行即可]
import '@/plugins/validate'

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
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由：底下的写法KV一致省略V，【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')

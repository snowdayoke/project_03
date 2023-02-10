import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex)

// 引入小仓库home|search模块
import home from './home'
import search from './search'

// 创建并暴露store(如果不暴露，外部是不能使用的)
export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search
    }
})
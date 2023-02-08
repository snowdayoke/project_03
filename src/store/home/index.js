import {reqCategoryList} from '@/api'

// home模块的小仓库
const state = {
    // state中数据默认初识值别瞎写，根据服务器接口返回值是对象还是数组 设置。
    categoryList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据。
    // axios函数返回的是一个Promise函数，加async，await，会得到返回数据
    async categoryList({commit}){
        let result = await reqCategoryList()
       if(result.code === 200){
        commit('CATEGORYLIST', result.data)
       }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
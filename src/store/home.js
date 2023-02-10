import {reqCategoryList, reqGetBannerList, regGetFloorList} from '@/api'

// home模块的小仓库
const state = {
    // state中数据默认初识值别瞎写，根据服务器接口返回值是对象还是数组 设置。
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据。
    // axios函数返回的是一个Promise函数，加async，await，会得到返回数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
        commit('GETCATEGORYLIST', result.data)
       }
    },
    // 获取轮播图的数据
    async getBannerList({commit}){
        let res = await reqGetBannerList()
        if(res.code === 200){
            commit('GETBANNERLIST',res.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result = await regGetFloorList()
        if(result.code === 200){
            commit('GETFLOORLIST', result.data)
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
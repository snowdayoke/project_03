import {reqGetSearchInfo} from '@/api'
// search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchInfo({commit},params={}){
        // 当前reqGetSearchInfo函数在调用的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        const result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// getters计算属性：在项目中，为了简化数据而生
const getters = {
    // 当前形参state，是search仓库中的state
    // 假如网络不给力|没有网，state.searchList应该返回的是undefined,会报错
    // 因而加个空数组
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
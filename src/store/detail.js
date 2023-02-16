import {reqGetGoodInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/getUUID'

// detail模块的小仓库
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodInfo({commit},skuId){
        const result = await reqGetGoodInfo(skuId)
        if(result.code ==200){
            commit('GETGOODINFO',result.data)
        }
    },
    // 加入购物车||修改某一产品的个数
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 发请求：前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        // 不需要再三连环
        // 注意：async函数执行返回的结果一定是个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            // 返回的是成功的标记
            return 'ok'
        }else{
            // 返回的是失败的标记
            return Promise.reject(new Error('failed'))
        }
    }
}
const getters = {
    categoryView(state){
        // 如果state.goodInfo初始状态为空对象，空对象.categoryView属性值undefined
        // 当前计算出的categoryView至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
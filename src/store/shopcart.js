import {reqShopCart,reqDeleteCartById,reqCheckCartById} from '@/api'

// shopcart模块的小仓库
const state = {
    shopCart:[]
}
const mutations = {
    GETSHOPCART(state,shopCart){
        state.shopCart=shopCart
    }
}
const actions = {
    // 获取购物车列表
    async getShopCart({commit}){
        let result = await reqShopCart()
        if(result.code==200){
            commit('GETSHOPCART', result.data)
        }
    },
    // 删除购物车商品
    async deleteCartById({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 修改产品选中状态
    async reqCheckCartById({commit},{skuId,isChecked}){
        let result = await reqCheckCartById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 删除勾选中的商品
    deleteAllCheckCarts({getters,dispatch}){
        // context:是shopcart小仓库。里面有commit,dispatch,getters,state
        // getters获取购物车中的全部产品
        let promiseAll = []
        getters.shopCart.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartById',item.skuId):''
            // 将每一次返回的promise添加到数组当中
            promiseAll.push(promise)
        })
        // 只要全部的p1|p2...都成功，返回结果即为成功；如果有一个失败，返回结果即为失败
        return Promise.all(promiseAll)  
    },
    // 修改全部商品的勾选状态
    updateAllCheckCarts({state,dispatch},isChecked){
        let promiseAll = []
        state.shopCart[0].cartInfoList.forEach(item=>{
            let promise = dispatch('reqCheckCartById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters ={
    shopCart(state){
        return state.shopCart[0]||{}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
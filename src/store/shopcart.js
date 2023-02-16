import {reqShopCart} from '@/api'

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
    async getShopCart({commit}){
        let result = await reqShopCart()
        if(result.code==200){
            commit('GETSHOPCART', result.data)
        }
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
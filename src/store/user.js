import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

// 注册、登录的模块
const state = {
    codeList:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODELIST(state,codeList){
        state.codeList = codeList
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(){
        state.token=''
        state.userInfo={}
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCodeList({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODELIST',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // 服务器下发token，将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            // 用户已经登录成功且获取到token
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject('failed')
        }
    },
    // 退出登录
    async logout({commit}){
        let result = await reqLogout()
        if(result.code==200){
         // action里面不能操作state，提交mutations修改state
         commit('CLEAR')
          return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
   
}
const getters ={}
export default {
    state,
    mutations,
    actions,
    getters
}
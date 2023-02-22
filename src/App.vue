<template>
    <div>
      <!-- <h1 v-upper="msg"></h1> -->
      <Header></Header>
      <!-- 路由组件出口的地方 -->
      <router-view></router-view>
      <!-- 在Home、search显示，在登录，注册中隐藏 -->
      <!-- <Footer v-show="$route.path=='/home'|| $route.path=='/search'"></Footer> -->
      <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
    data() {
      return {
        msg:'abc'
      }
    },
    components:{Header,Footer},
    mounted(){
      // 派发actions，通知Vuex发请求。获取三级列表的数据
      this.$store.dispatch('categoryList')
    }

}
</script>

<style>

</style>
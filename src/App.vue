<template>
    <div>
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
    components:{Header,Footer}
}
</script>

<style>

</style>
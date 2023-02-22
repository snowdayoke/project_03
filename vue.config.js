const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // 处理map文件
  productionSourceMap:false,
  // 关闭eslint校验工具
  lintOnSave:false,

  // 代理跨域
  devServer: {
    proxy: {
      './api': {
        target:'http://gmall-h5-api.atguigu.cn',
        pathRewrite: {'^/api': ''},
      }
    }
  }
}

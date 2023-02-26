const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  //关闭严格模式
  lintOnSave: false,
  //跨域问题
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host:"localhost",
    port: '8080',
    https: false, //是否使用https协议
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        ws:false,
        pathRewrite: {
          '^/': ''
        },
      }
    },
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
};

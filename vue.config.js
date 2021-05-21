module.exports = {
  configureWebpack:{
    devServer: {
      port: 3000, // 端口
    },
    resolve:{
      alias:{
        'assets': '@/assets',
        'common': '@/components/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}

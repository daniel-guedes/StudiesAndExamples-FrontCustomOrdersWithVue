const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': true, // Ativa ou desativa a Options API
        '__VUE_PROD_DEVTOOLS__': false, // Remove devtools no ambiente de produção
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false, // Remove detalhes de hidratação
      })
    ]
  }
});
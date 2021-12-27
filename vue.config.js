module.exports = {
    chainWebpack: (config) => {
      config.plugins.delete('fork-ts-checker')
    },
    lintOnSave: false
  }
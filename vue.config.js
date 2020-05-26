const Title = 'OpenAPI-Builder'

process.env.VUE_APP_TITLE = Title
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = Title
            return args
        })
        config.resolve.extensions.merge(['.ts']).end()
        config.module.rules.delete('eslint').end()
        config.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .end()
    },
}

const title = 'OpenAPI'
const version = require('./package.json').version

process.env.VUE_APP_TITLE = title
process.env.VUE_APP_VERSION = version

function getFolder() {
    const list = version.split('.')
    const minor = parseInt(list[1]) >= 10 ? list[1] : '0'.concat(list[1])
    return 'build' + list[0] + minor
}

module.exports = {
    lintOnSave: false,
    outputDir: getFolder(),
    publicPath: '',
    productionSourceMap: false,
}

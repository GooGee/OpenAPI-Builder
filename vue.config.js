process.env.VUE_APP_VERSION = require('./package.json').version

function getFolder() {
    const list = process.env.VUE_APP_VERSION.split('.')
    const minor = parseInt(list[1]) >= 10 ? list[1] : '0'.concat(list[1])
    return 'build' + list[0] + minor
}

module.exports = {
    lintOnSave: false,
    outputDir: getFolder(),
    publicPath: '',
    productionSourceMap: false,
}

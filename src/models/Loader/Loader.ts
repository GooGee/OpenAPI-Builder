import Builder from "../Builder"

export default class Loader {
    private builder: Builder

    constructor(builder: Builder) {
        this.builder = builder
    }

    load(source: Builder) {
        if (!this.valid(source)) {
            throw new Error('Unknown data')
        }
        const version = source.version
        const message = `Cannot load version ${version} data`
        if (version < this.builder.version) {
            throw new Error(message)
        }
        if (version > this.builder.version) {
            throw new Error(message)
        }

        this.builder.load(source)
    }

    private valid(source: Builder) {
        const mustContain = ['version', 'OAPI', 'extention', 'document', 'presetManager']
        const keys = Object.keys(source)
        return mustContain.every(key => {
            return keys.indexOf(key) > -1
        })
    }
}

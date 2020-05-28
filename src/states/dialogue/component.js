import builder from '../builder.js'
import { Dialogue } from './dialogue'

const map = {
    callbacks: 'callbackManager',
    examples: 'exampleManager',
    headers: 'headerManager',
    links: 'linkManager',
    parameters: 'parameterManager',
    requestBodies: 'requestManager',
    responses: 'responseManager',
    schemas: 'schemaManager',
    securitySchemes: 'securitySchemeManager',
}

class ComponentDialogue extends Dialogue {
    constructor() {
        super()
        this.type = 'schemas'
        this.keyword = ''
        this.selected = null
    }

    get list() {
        const key = map[this.type]
        return builder.document.component[key].list
    }

    get filtered() {
        if (this.keyword) {
            const re = new RegExp(this.keyword, 'i')
            return this.list.filter(item => {
                return item.name.search(re) > -1
            })
        }

        return this.list
    }

    show(title, callback) {
        this.keyword = ''
        this.selected = null
        super.show(title, callback)
    }

    select(item) {
        this.selected = item
        if (this.callback) {
            this.callback(true)
        }
    }
}

export default new ComponentDialogue()

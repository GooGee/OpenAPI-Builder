import Item from "../Base/Item"
import Dialogue from "./Dialogue"
import KeyValue from "../Base/KeyValue"
import UniqueList from "../Base/UniqueList"
import UniqueItem from "../Base/UniqueItem"
import Builder from "../Builder"

const map: KeyValue = {
    callbacks: 'callbackManager',
    examples: 'exampleManager',
    headers: 'headerManager',
    links: 'linkManager',
    parameters: 'parameterManager',
    requestBodies: 'requestBodyManager',
    responses: 'responseManager',
    schemas: 'schemaManager',
    securitySchemes: 'securitySchemeManager',
}

export default class ComponentDialogue extends Dialogue {
    builder: Builder
    keyword: string = 'schemas'
    selected: Item | null = null
    single: boolean = false
    type: string = 'schemas'

    constructor(builder: Builder) {
        super()
        this.builder = builder
    }

    get list() {
        if (this.builder.document) {
            const key = map[this.type]
            const component = this.builder.document.component as any
            const manager = component[key] as UniqueList<UniqueItem>
            return manager.list
        }

        return []
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

    show(title: string, callback: CallableFunction) {
        this.keyword = ''
        this.selected = null
        this.single = false
        super.show(title, callback)
    }

    showOnly(title: string, callback: CallableFunction) {
        this.show(title, callback)
        this.single = true
    }

    select(item: Item) {
        this.selected = item
        if (this.callback) {
            this.callback(true)
        }
    }
}
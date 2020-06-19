import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export enum ReferenceType {
    examples = 'examples',
    headers = 'headers',
    links = ' links',
    parameters = 'parameters',
    requestBodies = 'requestBodies',
    responses = 'responses',
    schemas = 'schemas',
}

export default class Reference extends UniqueItem {
    type: ReferenceType

    constructor(name: string, type: ReferenceType) {
        super(name)
        this.type = type
    }

    get text() {
        return `#/components/${this.type}/${this.name}`
    }

    toOAPI() {
        return {
            $ref: this.text
        }
    }
}

export class ReferenceManager extends UniqueList<Reference> {
    readonly type: ReferenceType

    constructor(type: ReferenceType) {
        super(Reference)
        this.type = type
    }

    make(name: string, type: ReferenceType = this.type) {
        const item = new Reference(name, type)
        return item
    }

    toOAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}

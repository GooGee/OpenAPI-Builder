import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export enum ReferenceType {
    examples = 'examples',
    headers = 'headers',
    links = 'links',
    parameters = 'parameters',
    paths = 'paths',
    requestBodies = 'requestBodies',
    responses = 'responses',
    schemas = 'schemas',
    security = 'security',
}

export default class Reference extends UniqueItem {
    type: ReferenceType

    constructor(name: string, type: ReferenceType = ReferenceType.schemas) {
        super(name)
        this.type = type
    }

    get id() {
        return this._id
    }

    set id(id: number) {
        this._id = id
    }

    get text() {
        if (this.type === 'paths') {
            const name = this.un.split('/').join('~1')
            return `#/${this.type}/${name}`
        }
        return `#/components/${this.type}/${this.un}`
    }

    toOAPI() {
        return {
            $ref: this.text,
        }
    }
}

export class ReferenceManager extends UniqueItemManager<Reference> {
    readonly referenceType: ReferenceType

    constructor(type: ReferenceType) {
        super(Reference)
        this.referenceType = type
    }

    make(name: string, type: ReferenceType = this.referenceType) {
        const item = new Reference(name, type)
        return item
    }
}

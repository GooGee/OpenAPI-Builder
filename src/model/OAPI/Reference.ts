import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

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

    constructor(name: string, type: ReferenceType = ReferenceType.schemas) {
        super(name)
        this.type = type
    }

    get text() {
        return `#/components/${this.type}/${this.ui}`
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

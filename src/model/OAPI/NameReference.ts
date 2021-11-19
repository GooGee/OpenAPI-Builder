import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import Reference, { TargetType } from './Reference'

export default class NameReference extends UniqueItem {
    readonly reference

    constructor(name: string, type: TargetType) {
        super(name)
        this.reference = new Reference(0, type)
    }

    protected get allowSetUI() {
        return true
    }

    toOAPI(finder: ReferenceFinder) {
        return this.reference.toOAPI(finder)
    }
}

export class NameReferenceManager extends UniqueItemManager<NameReference> {
    constructor(readonly targetType: TargetType) {
        super(NameReference)
    }

    add(item: NameReference) {
        item.ui = 0
        super.add(item)
    }

    make(name: string) {
        const item = new NameReference(name, this.targetType)
        return item
    }
}

import Reference, { TargetType } from '../OAPI/Reference'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class Layer extends UniqueItem {
    useExisted = false
    unPattern = '${schema.un}'

    readonly reference

    constructor(name: string, targetType: TargetType) {
        super(name)
        this.reference = new Reference(0, targetType)
    }
}

export class LayerManager extends UniqueItemManager<Layer> {
    constructor(readonly targetType: TargetType) {
        super(Layer)
    }

    make(name: string) {
        return new this.type(name, this.targetType)
    }
}

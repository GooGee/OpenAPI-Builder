import TargetType from '../OAPI/TargetType'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class Layer extends UniqueItem {
    constructor(name: string, readonly type: TargetType) {
        super(name)
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

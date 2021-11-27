import { ReferenceManager, TargetType } from '../OAPI/Reference'
import Layer from './Layer'
import UniqueItemManager from './UniqueItemManager'

export default class LayerPath extends Layer {
    readonly operationManager = new ReferenceManager(TargetType.LayerOperation)
}

export class LayerPathManager extends UniqueItemManager<LayerPath> {
    constructor() {
        super(LayerPath)
    }
}

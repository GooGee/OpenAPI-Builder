import Reference, { TargetType, ReferenceManager } from '../OAPI/Reference'
import Layer from './Layer'
import UniqueItemManager from './UniqueItemManager'

export default class LayerOperation extends Layer {
    readonly requestBody = new Reference(0, TargetType.LayerRequestBody)
    readonly statusManager = new ReferenceManager(TargetType.LayerResponse)
}

export class LayerOperationManager extends UniqueItemManager<LayerOperation> {
    constructor() {
        super(LayerOperation)
    }
}

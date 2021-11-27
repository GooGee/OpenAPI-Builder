import { ReferenceManager, TargetType } from '../OAPI/Reference'
import Layer from './Layer'
import UniqueItemManager from './UniqueItemManager'

export default class LayerRequestBody extends Layer {
    readonly mtManager = new ReferenceManager(TargetType.LayerMediaType)
}

export class LayerRequestBodyManager extends UniqueItemManager<LayerRequestBody> {
    constructor() {
        super(LayerRequestBody)
    }
}

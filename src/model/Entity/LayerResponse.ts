import { ReferenceManager, TargetType } from '../OAPI/Reference'
import Layer from './Layer'
import UniqueItemManager from './UniqueItemManager'

export default class LayerResponse extends Layer {
    readonly mtManager = new ReferenceManager(TargetType.LayerMediaType)
}

export class LayerResponseManager extends UniqueItemManager<LayerResponse> {
    constructor() {
        super(LayerResponse)
    }
}

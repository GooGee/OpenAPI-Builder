import Reference, { TargetType } from '../OAPI/Reference'
import Layer from './Layer'
import UniqueItemManager from './UniqueItemManager'

export default class LayerMediaType extends Layer {
    readonly schema = new Reference(0, TargetType.LayerSchema)
}

export class LayerMediaTypeManager extends UniqueItemManager<LayerMediaType> {
    constructor() {
        super(LayerMediaType)
    }
}

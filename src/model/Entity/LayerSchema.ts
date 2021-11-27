import Reference, { TargetType } from '../OAPI/Reference'
import Layer from './Layer'
import UniqueItemManager from './UniqueItemManager'

export default class LayerSchema extends Layer {
    readonly dependent = new Reference(0, TargetType.LayerSchema)
}

export class LayerSchemaManager extends UniqueItemManager<LayerSchema> {
    constructor() {
        super(LayerSchema)
    }
}

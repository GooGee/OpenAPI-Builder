import Reference, { TargetType } from '../OAPI/Reference'
import { LayerMediaTypeManager } from './LayerMediaType'
import LayerSchema from './LayerSchema'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerResponse extends UniqueItem {
    unPattern = '${schema.un}_${operation.un + path.suffix}'
    useExisted = false

    readonly mtManager = new LayerMediaTypeManager()
    readonly reference = new Reference(0, TargetType.responses)
    readonly schema = new LayerSchema('')

    protected get allowSetUI() {
        return true
    }
}

export class LayerResponseManager extends UniqueItemManager<LayerResponse> {
    constructor() {
        super(LayerResponse)
    }
}

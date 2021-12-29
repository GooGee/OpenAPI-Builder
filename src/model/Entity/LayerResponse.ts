import Reference from '../OAPI/Reference'
import TargetType from '../OAPI/TargetType'
import { LayerMediaTypeManager } from './LayerMediaType'
import LayerSchema from './LayerSchema'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerResponse extends UniqueItem {
    // un is status code
    unPattern = '${schema.un}_${operation.un + path.suffix}'
    useExisted = false

    readonly mtManager = new LayerMediaTypeManager()
    readonly reference = new Reference(0, TargetType.responses)
    readonly schema = new LayerSchema(
        '${schema.un}_Response_${operation.un + path.suffix}',
    )

    protected get allowSetUI() {
        return true
    }
}

export class LayerResponseManager extends UniqueItemManager<LayerResponse> {
    constructor() {
        super(LayerResponse)
    }
}

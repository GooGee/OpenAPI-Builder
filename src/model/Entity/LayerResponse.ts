import { LayerMediaTypeManager } from './LayerMediaType'
import LayerSchema from './LayerSchema'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerResponse extends UniqueItem {
    unPattern = '${schema.un}_${operation.un + path.suffix}'
    readonly mtManager = new LayerMediaTypeManager()
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

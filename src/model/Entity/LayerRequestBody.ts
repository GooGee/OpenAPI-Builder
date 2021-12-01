import { LayerMediaTypeManager } from './LayerMediaType'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerRequestBody extends UniqueItem {
    unPattern = '${schema.un}_${operation.un}${path.suffix}'
    readonly mtManager = new LayerMediaTypeManager()
}

export class LayerRequestBodyManager extends UniqueItemManager<LayerRequestBody> {
    constructor() {
        super(LayerRequestBody)
    }
}

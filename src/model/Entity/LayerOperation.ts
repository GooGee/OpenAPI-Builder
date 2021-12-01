import LayerRequestBody from './LayerRequestBody'
import { LayerResponseManager } from './LayerResponse'
import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerOperation extends UniqueItem {
    readonly requestBody = new LayerRequestBody('')
    readonly statusManager = new LayerResponseManager()
}

export class LayerOperationManager extends UniqueItemManager<LayerOperation> {
    constructor() {
        super(LayerOperation)
    }
}

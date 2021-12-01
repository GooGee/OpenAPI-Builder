import { LayerOperationManager } from './LayerOperation'
import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerPath extends SideBarItem {
    suffix = ''
    readonly operationManager = new LayerOperationManager()
}

export class LayerPathManager extends UniqueItemManager<LayerPath> {
    constructor() {
        super(LayerPath)
    }
}

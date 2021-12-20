import TargetType from '../OAPI/TargetType'
import { LayerManager } from './Layer'
import LayerOperation, { LayerOperationManager } from './LayerOperation'
import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerPath extends SideBarItem {
    unPattern = '/${schema.snakeCase}'
    suffix = ''
    readonly operation = new LayerOperation('get')
    // readonly operationManager = new LayerOperationManager()
    readonly parameterManager = new LayerManager(TargetType.parameters)
}

export class LayerPathManager extends UniqueItemManager<LayerPath> {
    constructor() {
        super(LayerPath)
    }
}

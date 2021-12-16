import TargetType from '../OAPI/TargetType'
import { LayerManager } from './Layer'
import { LayerOperationManager } from './LayerOperation'
import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class LayerPath extends SideBarItem {
    unPattern = '/${schema.snakeCase}'
    suffix = ''
    readonly operationManager = new LayerOperationManager()
    readonly parameterManager = new LayerManager(TargetType.parameters)
}

export class LayerPathManager extends UniqueItemManager<LayerPath> {
    constructor() {
        super(LayerPath)
    }
}

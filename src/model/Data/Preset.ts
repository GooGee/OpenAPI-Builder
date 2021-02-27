import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { PropertyManager } from './Property'

export default class Preset extends SideBarItem {
    required = false
    description = ''
    version = 1
    readonly propertyManager = new PropertyManager()
}

export class PresetManager extends UniqueItemManager<Preset> {
    readonly list: Array<Preset> = []

    constructor() {
        super(Preset)
    }
}

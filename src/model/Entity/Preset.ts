import { PropertyManager } from './Property'
import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class Preset extends SideBarItem {
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

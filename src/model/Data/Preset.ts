import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import { PropertyManager } from './Property'

export default class Preset extends UniqueItem {
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

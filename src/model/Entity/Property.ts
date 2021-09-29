import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class Property extends UniqueItem {
    tag = ''
    value = ''
}

export class PropertyManager extends UniqueItemManager<Property> {
    readonly list: Array<Property> = []

    constructor() {
        super(Property)
    }
}

import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Property extends UniqueItem {
    data = {}
    tag = ''
    value = ''
}

export class PropertyManager extends UniqueItemManager<Property> {
    readonly list: Array<Property> = []

    constructor() {
        super(Property)
    }
}

import UniqueItem from './UniqueItem'
import UniqueItemManager from './UniqueItemManager'

export default class ImportItem extends UniqueItem {
    required = false
    value = ''
}

export class ImportItemManager extends UniqueItemManager<ImportItem> {
    readonly list: Array<ImportItem> = []

    constructor() {
        super(ImportItem)
    }
}

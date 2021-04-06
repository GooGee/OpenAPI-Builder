import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Key extends UniqueItem {
    value = ''
    required = false
}

export class KeyManager extends UniqueItemManager<Key> {
    constructor() {
        super(Key)
    }
}

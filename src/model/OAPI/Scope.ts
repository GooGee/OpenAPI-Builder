import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class Scope extends UniqueItem {
    description = ''
}

export class ScopeManager extends UniqueItemManager<Scope> {
    constructor() {
        super(Scope)
    }
}

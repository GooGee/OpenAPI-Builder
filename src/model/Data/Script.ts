import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Script extends UniqueItem {
    code = ''
    description = ''
    single = false
}

export class ScriptManager extends UniqueItemManager<Script> {
    readonly list: Array<Script> = []

    constructor() {
        super(Script)
    }
}

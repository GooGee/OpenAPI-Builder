import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class Script extends SideBarItem {
    code = 'function run(data) {\n    /** @type {DataForScript} */\n    const ddd = data\n}'
    description = ''
    global = false
    single = false
}

export class ScriptManager extends UniqueItemManager<Script> {
    readonly list: Array<Script> = []

    constructor() {
        super(Script)
    }
}

import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import Constant from '../Service/Constant'

export default class Script extends SideBarItem {
    code = Constant.CodeForScript
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

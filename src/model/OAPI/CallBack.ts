import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Reference, { ReferenceType } from './Reference'

export default class CallBack extends SideBarItem {
    readonly path = new Reference('', ReferenceType.path)

    toOAPI() {
        return {
            [this.un]: this.path.toOAPI(),
        }
    }
}

export class CallBackManager extends UniqueItemManager<CallBack> {
    constructor() {
        super(CallBack)
    }
}

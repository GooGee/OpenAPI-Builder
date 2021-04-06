import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class CallBack extends SideBarItem {}

export class CallBackManager extends UniqueItemManager<CallBack> {
    constructor() {
        super(CallBack)
    }
}

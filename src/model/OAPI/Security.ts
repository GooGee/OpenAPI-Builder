import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Security extends SideBarItem {
    toOAPI() {
        return {
            [this.ui]: [],
        }
    }
}

export class SecurityManager extends UniqueItemManager<Security> {
    constructor() {
        super(Security)
    }
}

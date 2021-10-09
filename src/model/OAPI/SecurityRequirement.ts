import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class SecurityRequirement extends SideBarItem {
    toOAPI() {
        return {
            [this.un]: [],
        }
    }
}

export class SecurityRequirementManager extends UniqueItemManager<SecurityRequirement> {
    constructor() {
        super(SecurityRequirement)
    }
}

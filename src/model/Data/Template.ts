import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import Constant from '../Service/Constant'

export default class Template extends SideBarItem {
    code = Constant.CodeForTemplate
    description = ''
}

export class TemplateManager extends UniqueItemManager<Template> {
    readonly list: Array<Template> = []

    constructor() {
        super(Template)
    }
}

import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class Template extends SideBarItem {
    code = ''
    description = ''
}

export class TemplateManager extends UniqueItemManager<Template> {
    readonly list: Array<Template> = []

    constructor() {
        super(Template)
    }
}

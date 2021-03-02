import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Template extends SideBarItem {
    description = ''
    text = '{\n  "$ref": "#/components/schemas/Response"\n}'
}

export class TemplateManager extends UniqueItemManager<Template> {
    readonly list: Array<Template> = []

    constructor() {
        super(Template)
    }
}

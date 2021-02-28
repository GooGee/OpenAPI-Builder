import lodash from 'lodash'
import UniqueItem from './Base/UniqueItem'
import UniqueItemManager from './Base/UniqueItemManager'
import Route from './Bridge/ToJava/Route'
import Project from './Data/Project'
import SideBar, { SideBarEnum, SideBarManager } from './Data/SideBar'
import ListDialogue from './Dialogue/ListDialogue'
import UIDialogue from './Dialogue/UIDialogue'
import EventManager from './Event/EventManager'
import Manager from './Service/Manager'
import { run } from './Service/Text'

export default class Vendor {
    readonly preset: Project
    project: Project | null = null

    readonly event = EventManager.manager
    readonly listDialogue = new ListDialogue()
    readonly uiDialogue = new UIDialogue()
    readonly route: Route
    readonly service: Manager

    sidebar: SideBar = new SideBar('', new UniqueItemManager<UniqueItem>(UniqueItem))
    readonly sbManager = new SideBarManager()

    constructor(preset: Project, route: Route, service: Manager) {
        this.preset = preset
        this.route = route
        this.service = service
    }

    get ready() {
        if (this.project === null) {
            return false
        }
        return true
    }

    getProject() {
        return this.project!
    }

    run(code: string) {
        const data = {
            lodash,
            project: this.getProject(),
        }
        run(code, data)
    }

    show(title: SideBarEnum) {
        this.sidebar = this.sbManager.get(title)
    }
}

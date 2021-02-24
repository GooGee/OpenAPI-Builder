import UniqueItem from './Base/UniqueItem'
import UniqueItemManager from './Base/UniqueItemManager'
import Route from './Bridge/ToJava/Route'
import Project from './Data/Project'
import SideBar, { SideBarEnum, SideBarManager } from './Data/SideBar'
import ListDialogue from './Dialogue/ListDialogue'
import EventManager from './Event/EventManager'

export default class Vendor {
    readonly preset: Project
    project: Project | null = null

    readonly event = EventManager.manager
    readonly listDialogue = new ListDialogue()
    readonly route: Route

    sidebar: SideBar = new SideBar('', new UniqueItemManager<UniqueItem>(UniqueItem))
    readonly sbManager = new SideBarManager()

    constructor(preset: Project, route: Route) {
        this.preset = preset
        this.route = route
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

    show(title: SideBarEnum) {
        this.sidebar = this.sbManager.get(title)
    }
}

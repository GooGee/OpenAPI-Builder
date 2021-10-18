import JavaWorker from './Bridge/ToJava/JavaWorker'
import Project from './Entity/Project'
import { SideBarManager } from './Entity/SideBar'

export default class Vendor {
    readonly preset: Project
    project: Project
    readonly sbManager = new SideBarManager()

    constructor(readonly data: Project, readonly worker: JavaWorker) {
        this.preset = new Project()
        this.preset.load(data)
        this.project = this.preset
    }

    create() {
        this.project = new Project()
        this.project.load(this.data)
        this.sbManager.bind(this.project)
    }
}

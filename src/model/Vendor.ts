import JavaWorker from './Bridge/ToJava/JavaWorker'
import { EmitterType, EventEnum } from './Entity/Event'
import Project from './Entity/Project'
import { SideBarManager } from './Entity/SideBar'

export default class Vendor {
    readonly preset: Project
    private _project: Project
    readonly sbManager = new SideBarManager()

    constructor(
        readonly data: Project,
        readonly worker: JavaWorker,
        readonly emitter: EmitterType,
    ) {
        this.preset = new Project()
        this.preset.load(data)
        this._project = this.preset
    }

    create() {
        const project = new Project()
        project.load(this.data)
        this.project = project
    }

    get project(): Project {
        return this._project
    }

    set project(project: Project) {
        this._project = project
        this.sbManager.bind(this.project)
        this.emitter.emit(EventEnum.ready)
    }
}

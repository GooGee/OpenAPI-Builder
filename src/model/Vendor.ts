import JavaWorker from './Bridge/ToJava/JavaWorker'
import { EmitterType, EventEnum } from './Entity/Event'
import Project from './Entity/Project'
import { SideBarManager } from './Entity/SideBar'

export default class Vendor {
    private _data: Project
    private _preset: Project
    private _project: Project

    readonly sbManager = new SideBarManager()

    constructor(
        data: Project,
        readonly worker: JavaWorker,
        readonly emitter: EmitterType,
    ) {
        this._data = data
        this._preset = new Project()
        this._project = this._preset
    }

    create() {
        const project = new Project()
        project.load(this.data)
        this.project = project
    }

    get data(): Project {
        return this._data
    }

    setData(data: Project) {
        this._data = data
        this._preset = new Project()
        this._preset.load(data)
        this._project = this._preset
    }

    get preset(): Project {
        return this._preset
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

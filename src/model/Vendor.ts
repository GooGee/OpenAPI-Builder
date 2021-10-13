import Project from './Entity/Project'
import { SideBarManager } from './Entity/SideBar'
import UniqueItem from './Entity/UniqueItem'
import Text from './Service/Text'

export default class Vendor {
    preset: Project
    project: Project
    readonly sbManager = new SideBarManager()

    constructor(readonly data: Project) {
        this.preset = new Project()
        this.preset.load(data)
        this.project = this.preset
    }

    create() {
        this.project = new Project()
        this.project.load(this.data)
        this.sbManager.bind(this.project)
    }

    run(code: string, schema: UniqueItem) {
        Text.run(code, this.project,schema)
    }
}

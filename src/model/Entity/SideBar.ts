import { filter } from '../Service/Text'
import Project from './Project'
import SideBarItem from './SideBarItem'
import UniqueItemManager from './UniqueItemManager'

export default class SideBar<T extends SideBarItem = SideBarItem> {
    readonly manager: UniqueItemManager<T>

    item: T | null = null
    keyword = ''
    title: string

    constructor(title: string, manager: UniqueItemManager<T>) {
        this.title = title
        this.manager = manager
    }

    get list() {
        if (!this.manager) {
            return []
        }

        if (this.keyword) {
            return filter(this.keyword, this.manager.list)
        }
        return this.manager.list
    }
}

export enum SideBarEnum {
    Example = 'Example',
    Header = 'Header',
    Parameter = 'Parameter',
    Path = 'Path',
    Preset = 'Preset',
    Request = 'Request',
    Response = 'Response',
    Schema = 'Schema',
    SecurityRequirement = 'SecurityRequirement',
    SecurityScheme = 'SecurityScheme',
    Script = 'Script',
    Server = 'Server',
    Tag = 'Tag',
    Template = 'Template',
}

export class SideBarManager {
    readonly map = new Map<SideBarEnum, SideBar>()

    bind(project: Project) {
        this.map.set(
            SideBarEnum.Preset,
            new SideBar(SideBarEnum.Preset, project.presetManager),
        )
        this.map.set(
            SideBarEnum.Example,
            new SideBar(SideBarEnum.Example, project.oapi.component.exampleManager),
        )
        this.map.set(
            SideBarEnum.Header,
            new SideBar(SideBarEnum.Header, project.oapi.component.headerManager),
        )
        this.map.set(
            SideBarEnum.Parameter,
            new SideBar(SideBarEnum.Parameter, project.oapi.component.parameterManager),
        )
        this.map.set(
            SideBarEnum.Path,
            new SideBar(SideBarEnum.Path, project.oapi.pathManager),
        )
        this.map.set(
            SideBarEnum.Request,
            new SideBar(SideBarEnum.Request, project.oapi.component.requestBodyManager),
        )
        this.map.set(
            SideBarEnum.Response,
            new SideBar(SideBarEnum.Response, project.oapi.component.responseManager),
        )
        this.map.set(
            SideBarEnum.Schema,
            new SideBar(SideBarEnum.Schema, project.oapi.component.schemaManager),
        )
        this.map.set(
            SideBarEnum.SecurityRequirement,
            new SideBar(SideBarEnum.SecurityRequirement, project.oapi.securityManager),
        )
        this.map.set(
            SideBarEnum.SecurityScheme,
            new SideBar(
                SideBarEnum.SecurityScheme,
                project.oapi.component.securitySchemeManager,
            ),
        )
        this.map.set(
            SideBarEnum.Script,
            new SideBar(SideBarEnum.Script, project.scriptManager),
        )
        this.map.set(
            SideBarEnum.Server,
            new SideBar(SideBarEnum.Server, project.oapi.serverManager),
        )
        this.map.set(
            SideBarEnum.Tag,
            new SideBar(SideBarEnum.Tag, project.oapi.tagManager),
        )
        this.map.set(
            SideBarEnum.Template,
            new SideBar(SideBarEnum.Template, project.templateManager),
        )
    }

    get(name: SideBarEnum) {
        const sb = this.map.get(name)
        if (sb) {
            return sb
        }
        throw new Error(`SideBar ${name} not found!`)
    }
}

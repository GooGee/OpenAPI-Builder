import { exclude } from '../Decorator'
import Document from '../OAPI/Document'
import { ServerVariableManager } from '../OAPI/ServerVariable'
import ReferenceFinder from '../Service/ReferenceFinder'
import Item from './Item'
import { PresetManager } from './Preset'
import { ScriptManager } from './Script'
import { TemplateManager } from './Template'

const Version = 2

export default class Project extends Item {
    version = Version

    readonly presetManager = new PresetManager()
    readonly scriptManager = new ScriptManager()
    readonly serverVariableManager = new ServerVariableManager()
    readonly templateManager = new TemplateManager()

    readonly oapi = new Document()

    @exclude
    readonly finder = new ReferenceFinder(this)

    getPreset(name: string) {
        return this.presetManager.findByUN(name)
    }

    toOAPI() {
        return this.oapi.toOAPI(this.finder)
    }
}

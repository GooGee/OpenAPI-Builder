import Document from '../OAPI/Document'
import Item from './Item'
import { PresetManager } from './Preset'
import { ScriptManager } from './Script'
import { TemplateManager } from './Template'

const Version = 2

export default class Project extends Item {
    version = Version

    readonly presetManager = new PresetManager()
    readonly scriptManager = new ScriptManager()
    readonly templateManager = new TemplateManager()

    readonly oapi = new Document()

    getPreset(name: string) {
        return this.presetManager.findByUN(name)
    }

    toOAPI() {
        return this.oapi.toOAPI()
    }
}

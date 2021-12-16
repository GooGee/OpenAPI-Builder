import Document from '../OAPI/Document'
import Item from './Item'
import { LayerPathManager } from './LayerPath'
import { PresetManager } from './Preset'
import ProjectInterface from './ProjectInterface'
import { ScriptManager } from './Script'
import { TemplateManager } from './Template'

const Version = 2

export default class Project extends Item implements ProjectInterface {
    version = Version

    readonly flowManager = new LayerPathManager()
    readonly presetManager = new PresetManager()
    readonly scriptManager = new ScriptManager()
    readonly templateManager = new TemplateManager()

    readonly oapi = new Document()

    getPreset(name: string) {
        return this.presetManager.findByUN(name)
    }
}

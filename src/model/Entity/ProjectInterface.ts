import DocumentInterface from '../OAPI/DocumentInterface'
import { LayerPathManager } from './LayerPath'
import Preset, { PresetManager } from './Preset'
import { ScriptManager } from './Script'
import { TemplateManager } from './Template'

export default interface ProjectInterface {
    flowManager: LayerPathManager
    presetManager: PresetManager
    scriptManager: ScriptManager
    templateManager: TemplateManager
    oapi: DocumentInterface

    getPreset(name: string): Preset | undefined
}

import Item from '../Base/Item'
import Document from '../OAPI/Document'
import { PresetManager } from './Preset'

const Version = 1

export default class Project extends Item {
    version = Version
    autoSave = false

    readonly presetManager = new PresetManager()

    readonly oapi = new Document()

    getPreset(name: string) {
        return this.presetManager.find(name)
    }
}

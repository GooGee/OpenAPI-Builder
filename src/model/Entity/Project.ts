import { exclude } from '../Decorator'
import Document from '../OAPI/Document'
import ReferenceFinder from '../Service/ReferenceFinder'
import Item from './Item'
import { LayerMediaTypeManager } from './LayerMediaType'
import { LayerOperationManager } from './LayerOperation'
import { LayerPathManager } from './LayerPath'
import { LayerRequestBodyManager } from './LayerRequestBody'
import { LayerResponseManager } from './LayerResponse'
import { LayerSchemaManager } from './LayerSchema'
import { PresetManager } from './Preset'
import { ScriptManager } from './Script'
import { TemplateManager } from './Template'

const Version = 2

export default class Project extends Item {
    version = Version

    readonly LayerMediaTypeManager = new LayerMediaTypeManager()
    readonly LayerOperationManager = new LayerOperationManager()
    readonly LayerPathManager = new LayerPathManager()
    readonly LayerRequestBodyManager = new LayerRequestBodyManager()
    readonly LayerResponseManager = new LayerResponseManager()
    readonly LayerSchemaManager = new LayerSchemaManager()

    readonly presetManager = new PresetManager()
    readonly scriptManager = new ScriptManager()
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

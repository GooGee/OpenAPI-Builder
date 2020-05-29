import Item from "./Base/Item"
import Document from "./Specification/Document"
import { PresetManager } from "./Preset"

export default class Builder extends Item {
    readonly version: string = process.env.VUE_APP_VERSION || '0.0.0'
    readonly presetManager = new PresetManager
    document: Document | null = null

    make(name: string) {
        this.document = new Document
        this.document.info.title = name
    }

    load(data: Builder) {
        //
    }
}

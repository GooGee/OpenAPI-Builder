import Item from "./Base/Item"
import Document from "./Specification/Document"
import { PresetManager } from "./Preset"

export default class Builder extends Item {
    readonly extention = '.oapib'
    readonly version: string = process.env.VUE_APP_VERSION || '0.0.0'
    readonly presetManager = new PresetManager
    preset: Builder | null = null
    document: Document | null = null
    protected static IgnoreList = Item.IgnoreList.concat(['preset'])

    make(name: string) {
        this.load(this.preset!)
        this.document!.info.title = name
    }

    load(data: Builder) {
        this.document = new Document
        super.load(data)
    }
}

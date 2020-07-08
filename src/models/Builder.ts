import Item from "./Base/Item"
import Document from "./Specification/Document"
import { PresetManager } from "./Preset"

export default class Builder extends Item {
    readonly extention = '.oapib'
    readonly OAPI: String = '3.0.0'
    readonly version: Number = 1
    readonly presetManager = new PresetManager
    preset: Builder | null = null
    document: Document | null = null
    protected static IgnoreList = Item.IgnoreList.concat(['preset'])

    make(name: string) {
        this.presetManager.clear()
        this.load(this.preset!)
        this.document!.info.title = name
    }

    load(data: Builder) {
        this.presetManager.clear()
        this.document = new Document
        super.load(data)
    }
}

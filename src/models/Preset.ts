import UniqueItem from "./Base/UniqueItem"
import UniqueList from "./Base/UniqueList"
import { PropertyManager } from "./Property"

export default class Preset extends UniqueItem {
    custom: Boolean = true
    description: string = ''
    readonly propertyManager = new PropertyManager
}

export class PresetManager extends UniqueList<Preset> {

    constructor() {
        super(Preset)
    }

    make(name: string) {
        const preset = new Preset(name)
        return preset
    }

}

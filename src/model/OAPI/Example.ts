import JSONText from '../Entity/JSONText'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class Example extends SideBarItem {
    description = ''
    externalValue = ''
    summary = ''
    readonly value = new JSONText()
}

export class ExampleManager extends UniqueItemManager<Example> {
    constructor() {
        super(Example)
    }
}

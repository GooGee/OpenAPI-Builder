import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class Example extends SideBarItem {
    description = ''
    externalValue = ''
    summary = ''
    value = ''
}

export class ExampleManager extends UniqueItemManager<Example> {
    constructor() {
        super(Example)
    }
}

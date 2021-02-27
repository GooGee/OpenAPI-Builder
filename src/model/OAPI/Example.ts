import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'

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

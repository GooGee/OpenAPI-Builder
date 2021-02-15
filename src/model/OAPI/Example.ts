import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Example extends UniqueItem {
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

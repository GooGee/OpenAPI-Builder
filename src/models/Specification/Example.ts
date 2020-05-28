import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Example extends UniqueItem {
    description: string = ''
    externalValue: string = ''
    summary: string = ''
    value: string = ''

    toAPI() {
        return this
    }
}

export class ExampleManager extends UniqueList<Example> {

    constructor() {
        super(Example)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}

import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Reference, { ReferenceType } from "./Reference"

export default class Status extends UniqueItem {
    readonly response = new Reference('', ReferenceType.responses)

    toAPI() {
        return this.response.toAPI()
    }
}

export class StatusManager extends UniqueList<Status> {

    constructor() {
        super(Status)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}

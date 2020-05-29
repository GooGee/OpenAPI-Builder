import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { OperationManager } from "./Operation"

export default class Path extends UniqueItem {
    readonly operationManager = new OperationManager(this.name)

    toAPI() {
        return this.operationManager.toAPI()
    }
}

export class PathManager extends UniqueList<Path> {

    constructor() {
        super(Path)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}

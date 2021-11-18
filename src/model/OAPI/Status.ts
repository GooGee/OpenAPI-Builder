import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import Reference, { TargetType } from './Reference'

export default class Status extends UniqueItem {
    readonly response = new Reference(0, TargetType.responses)

    protected get allowSetUI() {
        return true
    }

    toOAPI(finder: ReferenceFinder) {
        return this.response.toOAPI(finder)
    }
}

export class StatusManager extends UniqueItemManager<Status> {
    constructor() {
        super(Status)
    }
}

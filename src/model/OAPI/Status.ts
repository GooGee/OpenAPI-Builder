import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Reference, { ReferenceType } from './Reference'

export default class Status extends UniqueItem {
    readonly response = new Reference('', ReferenceType.responses)

    toOAPI() {
        return this.response.toOAPI()
    }
}

export class StatusManager extends UniqueItemManager<Status> {
    constructor() {
        super(Status)
    }
}

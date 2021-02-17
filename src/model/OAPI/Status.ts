import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
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

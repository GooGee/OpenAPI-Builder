import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import Reference, { TargetType } from './Reference'

export default class CallBack extends UniqueItem {
    readonly path = new Reference(0, TargetType.paths)

    toOAPI(finder: ReferenceFinder) {
        return this.path.toOAPI(finder)
    }
}

export class CallBackManager extends UniqueItemManager<CallBack> {
    constructor() {
        super(CallBack)
    }
}

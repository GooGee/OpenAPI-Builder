import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { ReferenceManager, TargetType } from './Reference'

export default class Encoding extends UniqueItem {
    allowReserved = false
    contentType = ''
    explode = false
    readonly headerManager = new ReferenceManager(TargetType.headers)
    style = ''

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            allowReserved: this.allowReserved,
            contentType: this.contentType,
            explode: this.explode,
            headers: this.headerManager.toOAPI(finder),
            style: this.style,
        }
        return result
    }
}

export class EncodingManager extends UniqueItemManager<Encoding> {
    constructor() {
        super(Encoding)
    }
}

import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { ReferenceManager, ReferenceType } from './Reference'

export default class Encoding extends UniqueItem {
    allowReserved = false
    contentType = ''
    explode = false
    readonly headerManager = new ReferenceManager(ReferenceType.headers)
    style = ''

    toOAPI() {
        const result: KeyValue = {
            allowReserved: this.allowReserved,
            contentType: this.contentType,
            explode: this.explode,
            headers: this.headerManager.toOAPI(),
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

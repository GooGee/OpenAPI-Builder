import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { OAPIReferenceMap, ReferenceManager, TargetType } from './Reference'

interface OAPIEncoding {
    allowReserved: boolean
    contentType: string
    explode: boolean
    headers?: OAPIReferenceMap
    style?: string
}

export default class Encoding extends UniqueItem {
    allowReserved = false
    contentType = ''
    explode = false
    readonly headerManager = new ReferenceManager(TargetType.headers)
    style = ''

    toOAPI(finder: ReferenceFinder) {
        const result: OAPIEncoding = {
            allowReserved: this.allowReserved,
            contentType: this.contentType,
            explode: this.explode,
        }
        if (this.headerManager.list.length) {
            result.headers = this.headerManager.toOAPI(finder)
        }
        if (this.style) {
            result.style = this.style
        }
        return result
    }
}

export class EncodingManager extends UniqueItemManager<Encoding> {
    constructor() {
        super(Encoding)
    }
}

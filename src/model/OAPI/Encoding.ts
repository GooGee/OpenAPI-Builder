import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { OAPIReferenceMap, ReferenceManager } from './Reference'
import TargetType from './TargetType'

interface OAPIEncoding {
    allowReserved?: boolean
    contentType: string
    explode?: boolean
    headers?: OAPIReferenceMap
    style?: string
}

export default class Encoding extends UniqueItem {
    allowReserved = false
    contentType = ''
    explode = false
    readonly headerManager = new ReferenceManager(TargetType.headers)
    style = ''

    toOAPI(finder: ReferenceFinderInterface) {
        const result: OAPIEncoding = {
            contentType: this.contentType,
        }
        if (this.headerManager.list.length) {
            result.headers = this.headerManager.toOAPI(finder)
        }
        if (this.allowReserved) {
            result.allowReserved = this.allowReserved
        }
        if (this.explode) {
            result.explode = this.explode
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

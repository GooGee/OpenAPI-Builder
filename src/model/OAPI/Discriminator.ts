import Item from '../Entity/Item'
import KeyValue from '../Entity/KeyValue'
import ReferenceFinder from '../Service/ReferenceFinder'
import NameReference, { NameReferenceManager } from './NameReference'
import { TargetType } from './Reference'

export default class Discriminator extends Item {
    propertyName = ''
    readonly referenceManager = new NameReferenceManager(TargetType.schemas)

    makeOAPI(finder: ReferenceFinder) {
        const map: Map<number, NameReference> = new Map()
        this.referenceManager.list.map((item) => map.set(item.ui, item))
        const uixx = this.referenceManager.list.map((item) => item.ui)
        const list = finder.findManager(this.referenceManager.targetType).findAll(uixx)
        const result: KeyValue = {}
        list.forEach((item) => {
            result[item.un] = map.get(item.ui)?.reference.getText(item)
        })
        return result
    }

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            propertyName: this.propertyName,
            mapping: this.makeOAPI(finder),
        }
        return result
    }
}

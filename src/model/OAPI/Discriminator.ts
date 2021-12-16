import Item from '../Entity/Item'
import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import NameReference, { NameReferenceManager } from './NameReference'
import TargetType from './TargetType'

export interface OAPIDiscriminator {
    propertyName: string
    mapping: ObjectMap
}

export default class Discriminator extends Item {
    propertyName = ''
    readonly referenceManager = new NameReferenceManager(TargetType.schemas)

    private makeMapping(finder: ReferenceFinderInterface) {
        const map: Map<number, NameReference> = new Map()
        this.referenceManager.list.map((item) => map.set(item.ui, item))
        const uixx = this.referenceManager.list.map((item) => item.ui)
        const list = finder.findManager(this.referenceManager.targetType).findAll(uixx)
        const result: ObjectMap = {}
        list.forEach((item) => {
            result[item.un] = map.get(item.ui)?.reference.getText(item) ?? '??'
        })
        return result
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const result: OAPIDiscriminator = {
            propertyName: this.propertyName,
            mapping: this.makeMapping(finder),
        }
        return result
    }
}

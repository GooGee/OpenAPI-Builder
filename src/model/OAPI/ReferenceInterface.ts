import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UIItemInterface from '../Entity/UIItemInterface'
import UniqueItemInterface from '../Entity/UniqueItemInterface'
import TargetType from './TargetType'

export interface OAPIReference {
    $ref: string
}

export default interface ReferenceInterface extends UIItemInterface {
    type: TargetType
    ui: number
    getTarget<T extends UniqueItemInterface>(
        finder: ReferenceFinderInterface,
    ): T | undefined
    getText(finder: ReferenceFinderInterface): string
    getTextOfTarget<T extends UniqueItemInterface>(source: T): string
    toOAPI(finder: ReferenceFinderInterface): OAPIReference
    toOAPIofTarget<T extends UniqueItemInterface>(target?: T): OAPIReference
}

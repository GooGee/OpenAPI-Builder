import ReferenceInterface from '../OAPI/ReferenceInterface'
import TargetType from '../OAPI/TargetType'
import UniqueItemInterface from './UniqueItemInterface'
import UniqueItemManagerInterface from './UniqueItemManagerInterface'

export default interface ReferenceFinderInterface {
    find<T extends UniqueItemInterface>(reference: ReferenceInterface): T | undefined

    findByUI<T extends UniqueItemInterface>(ui: number, type: TargetType): T | undefined

    findManager(type: TargetType): UniqueItemManagerInterface

    getSchemaFieldList(schema: UniqueItemInterface): UniqueItemInterface[]
}

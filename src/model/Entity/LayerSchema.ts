import Reference from '../OAPI/Reference'
import TargetType from '../OAPI/TargetType'
import UniqueItem from './UniqueItem'

export default class LayerSchema extends UniqueItem {
    unPattern = ''
    readonly script = new Reference(0, TargetType.script)
}

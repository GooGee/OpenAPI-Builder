import Reference, { TargetType } from '../OAPI/Reference'
import UniqueItem from './UniqueItem'

export default class LayerSchema extends UniqueItem {
    unPattern = '${schema.un}_${operation.un + path.suffix}'
    readonly script = new Reference(0, TargetType.script)
}

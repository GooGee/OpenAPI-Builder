import Reference from '../OAPI/Reference'
import TargetType from '../OAPI/TargetType'
import { LayerMediaTypeManager } from './LayerMediaType'
import LayerSchema from './LayerSchema'
import UniqueItem from './UniqueItem'

export default class LayerRequestBody extends UniqueItem {
    unPattern = '${schema.un}_${operation.un + path.suffix}'
    useExisted = false

    readonly mtManager = new LayerMediaTypeManager()
    readonly reference = new Reference(0, TargetType.requestBodies)
    readonly schema = new LayerSchema('')
}

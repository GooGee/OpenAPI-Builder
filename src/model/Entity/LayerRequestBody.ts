import Reference from '../OAPI/Reference'
import TargetType from '../OAPI/TargetType'
import { LayerMediaTypeManager } from './LayerMediaType'
import LayerSchema from './LayerSchema'
import UniqueItem from './UniqueItem'

export default class LayerRequestBody extends UniqueItem {
    useExisted = false

    get unPattern() {
        return this.un
    }

    set unPattern(text: string) {
        this.un = text
    }

    readonly mtManager = new LayerMediaTypeManager()
    readonly reference = new Reference(0, TargetType.requestBodies)
    readonly schema = new LayerSchema(
        '${schema.un}_Request_${operation.un + path.suffix}',
    )
}

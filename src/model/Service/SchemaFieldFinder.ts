import SchemaComplex, { SchemaManager } from '../OAPI/SchemaComplex'
import { SchemaFieldManager } from '../OAPI/SchemaField'

export default class SchemaFieldFinder {
    constructor(
        readonly fieldManager: SchemaFieldManager,
        readonly schemaManager: SchemaManager,
    ) {}

    getFieldList(schema: SchemaComplex) {
        const set: Set<number> = new Set()
        this.getReferenceList(schema, set)
        return this.fieldManager.list.filter((item) => set.has(item.schemaUI))
    }

    private getReferenceList(schema: SchemaComplex, set: Set<number>) {
        if (schema.isTemplate) {
            return
        }
        if (set.has(schema.ui)) {
            return
        }
        set.add(schema.ui)

        const uixx = new Set(schema.referenceManager.list.map((item) => item.ui))
        this.schemaManager.list.forEach((item) => {
            if (uixx.has(item.ui)) {
                this.getReferenceList(item, set)
            }
        })
    }
}
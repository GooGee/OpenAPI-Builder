import Project from '../Entity/Project'
import SchemaComplex from '../OAPI/SchemaComplex'

export default class Factory {
    constructor(readonly project: Project) {}

    makeSchemaField(un: string, schema: SchemaComplex) {
        const field = this.project.oapi.fieldManager.make(un)
        this.project.oapi.fieldManager.add(field)
        field.schemaUI = schema.ui
        return field
    }
}

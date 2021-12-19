import Project from '../Entity/Project'
import Schema from '../OAPI/Schema'

export default class Factory {
    constructor(readonly project: Project) {}

    makeSchemaField(un: string, schema: Schema) {
        const field = this.project.oapi.fieldManager.make(un)
        this.project.oapi.fieldManager.add(field)
        field.schemaUI = schema.ui
        return field
    }
}

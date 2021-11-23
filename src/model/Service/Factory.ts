import Project from '../Entity/Project'
import { MediaTypeEnum, MediaTypeManager } from '../OAPI/MediaType'
import SchemaComplex from '../OAPI/SchemaComplex'

export default class Factory {
    constructor(readonly project: Project) {}

    makeMediaType(type: MediaTypeEnum, manager: MediaTypeManager) {
        const item = manager.make(type)
        return item
    }

    makeMediaTypeForm(manager: MediaTypeManager) {
        return this.makeMediaType(MediaTypeEnum.form, manager)
    }

    makeMediaTypeJSON(manager: MediaTypeManager) {
        return this.makeMediaType(MediaTypeEnum.json, manager)
    }

    makeMediaTypeXML(manager: MediaTypeManager) {
        return this.makeMediaType(MediaTypeEnum.xml, manager)
    }

    makeSchemaField(un: string, schema: SchemaComplex) {
        const field = this.project.oapi.fieldManager.make(un)
        this.project.oapi.fieldManager.add(field)
        field.schemaUI = schema.ui
        return field
    }
}

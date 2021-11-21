import Project from '../Entity/Project'
import { MediaTypeEnum, MediaTypeManager } from '../OAPI/MediaType'
import SchemaComplex from '../OAPI/SchemaComplex'

export default class Generator {
    constructor(readonly project: Project) {}

    get exampleManager() {
        return this.project.oapi.component.exampleManager
    }

    get headerManager() {
        return this.project.oapi.component.headerManager
    }

    get parameterManager() {
        return this.project.oapi.component.parameterManager
    }

    get pathManager() {
        return this.project.oapi.pathManager
    }

    get requestBodyManager() {
        return this.project.oapi.component.requestBodyManager
    }

    get responseManager() {
        return this.project.oapi.component.responseManager
    }

    get schemaManager() {
        return this.project.oapi.component.schemaManager
    }

    get scopeManager() {
        return this.project.oapi.scopeManager
    }

    get securityRequirement() {
        return this.project.oapi.securityManager
    }

    get securityScheme() {
        return this.project.oapi.component.securitySchemeManager
    }

    get serverManager() {
        return this.project.oapi.serverManager
    }

    get tagManager() {
        return this.project.oapi.tagManager
    }

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

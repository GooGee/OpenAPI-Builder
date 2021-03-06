import Project from '../Data/Project'
import { CompositionType } from '../OAPI/DataType'
import { MediaTypeEnum, MediaTypeManager } from '../OAPI/MediaType'
import { SchemaType } from '../OAPI/SchemaComplex'

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

    makeSchemaComposition(
        ui: string,
        list: string[] = [],
        type: CompositionType = CompositionType.allOf,
    ) {
        const schema = this.schemaManager.make(ui)
        schema.type = SchemaType.composition
        schema.composition.type = type
        list.forEach(name => {
            const item = schema.composition.schemaManager.make(name)
            schema.composition.schemaManager.add(item)
        })
        return schema
    }

    makeSchemaObject(ui: string, list: string[] = []) {
        const schema = this.schemaManager.make(ui)
        schema.type = SchemaType.object
        list.forEach(name => {
            const item = schema.object.schemaManager.make(name)
            schema.object.schemaManager.add(item)
        })
        return schema
    }
}

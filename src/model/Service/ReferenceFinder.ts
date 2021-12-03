import Project from '../Entity/Project'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Reference, { TargetType } from '../OAPI/Reference'
import SchemaComplex from '../OAPI/SchemaComplex'

export default class ReferenceFinder {
    constructor(readonly project: Project) {}

    find<T extends UniqueItem>(reference: Reference) {
        return this.findByUI<T>(reference.ui, reference.type)
    }

    findByUI<T extends UniqueItem>(ui: number, type: TargetType) {
        const manager = this.findManager(type)
        return manager.find(ui) as T
    }

    findManager(type: TargetType): UniqueItemManager {
        switch (type) {
            case TargetType.encoding:
                return this.project.oapi.encodingManager

            case TargetType.enumer:
                return this.project.oapi.enumerManager

            case TargetType.examples:
                return this.project.oapi.component.exampleManager

            case TargetType.field:
                return this.project.oapi.fieldManager

            case TargetType.flow:
                return this.project.layerManager

            case TargetType.headers:
                return this.project.oapi.component.headerManager

            case TargetType.parameters:
                return this.project.oapi.component.parameterManager

            case TargetType.paths:
                return this.project.oapi.pathManager

            case TargetType.requestBodies:
                return this.project.oapi.component.requestBodyManager

            case TargetType.responses:
                return this.project.oapi.component.responseManager

            case TargetType.schemas:
                return this.project.oapi.component.schemaManager

            case TargetType.scope:
                return this.project.oapi.scopeManager

            case TargetType.script:
                return this.project.scriptManager

            case TargetType.security:
                return this.project.oapi.component.securitySchemeManager

            case TargetType.tag:
                return this.project.oapi.tagManager

            case TargetType.variable:
                return this.project.oapi.serverVariableManager

            default:
                break
        }
        throw new Error('Unknown TargetType: ' + type)
    }

    getSchemaFieldList(schema: SchemaComplex) {
        const set: Set<number> = new Set()
        this.getReferenceList(schema, set)
        return this.project.oapi.fieldManager.list.filter((item) =>
            set.has(item.schemaUI),
        )
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
        this.project.oapi.component.schemaManager.list.forEach((item) => {
            if (uixx.has(item.ui)) {
                this.getReferenceList(item, set)
            }
        })
    }
}

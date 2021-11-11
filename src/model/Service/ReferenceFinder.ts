import Project from '../Entity/Project'
import { TargetType } from '../OAPI/Reference'

export default class ReferenceFinder {
    constructor(readonly project: Project) {}

    find(ui: number, type: TargetType) {
        const manager = this.findManager(type)
        return manager.find(ui)
    }

    findManager(type: TargetType) {
        switch (type) {
            case TargetType.examples:
                return this.project.oapi.component.exampleManager

            case TargetType.field:
                return this.project.oapi.fieldManager

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

            case TargetType.security:
                return this.project.oapi.component.securitySchemeManager

            case TargetType.tag:
                return this.project.oapi.tagManager

            default:
                break
        }
        throw new Error('Unknown TargetType: ' + type)
    }
}

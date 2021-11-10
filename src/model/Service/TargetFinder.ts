import Project from '../Entity/Project'
import { TargetType } from '../Entity/Target'

export default class TargetFinder {
    constructor(readonly project: Project) {}

    find(ui: number, type: TargetType) {
        const manager = this.findManager(type)
        return manager.find(ui)
    }

    findManager(type: TargetType) {
        switch (type) {
            case TargetType.Tag:
                return this.project.oapi.tagManager

            default:
                break
        }
        throw new Error('Unknown TargetType: ' + type)
    }
}

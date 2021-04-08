import Handler from '../Bridge/FromJava/Handler'
import Project from '../Data/Project'
import File from './File'

export const OAPIJSON = File.getOAPIPath('openapi.json')

export default class Export {
    static run(file: File, project: Project, handler?: Handler) {
        if (project === null) {
            return
        }
        const text = JSON.stringify(project.oapi.toOAPI())
        file.write(OAPIJSON, text, handler)
    }
}

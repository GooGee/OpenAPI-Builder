import Handler from '../Bridge/FromJava/Handler'
import Project from '../Data/Project'
import Export from './Export'
import File from './File'
import Save from './Save'

export default class Manager {
    readonly file: File

    constructor(file: File) {
        this.file = file
    }

    export(project: Project, handler?: Handler) {
        Export.run(this.file, project, handler)
    }

    save(project: Project, handler?: Handler) {
        Save.run(this.file, project, handler)
    }
}

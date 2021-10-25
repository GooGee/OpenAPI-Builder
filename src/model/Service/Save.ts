import { ActionEnum } from '../Bridge/FromJava/ActionEnum'
import Handler from '../Bridge/FromJava/Handler'
import Response from '../Bridge/FromJava/Response'
import { StatusEnum } from '../Bridge/FromJava/StatusEnum'
import Project from '../Entity/Project'
import File, { OAPIFolder } from './File'

const BackupFolder = OAPIFolder + '/backup'
const FileName = OAPIFolder + '/data.json'

export default class Save {
    static last = ''
    private static readonly fake = new Response(
        ActionEnum.write,
        FileName,
        '',
        'Nothing changed',
        StatusEnum.OK,
    )

    static run(file: File, project: Project, handler?: Handler) {
        if (project === null) {
            return
        }
        const text = JSON.stringify(project)
        if (text === this.last) {
            if (handler) {
                handler(this.fake)
            }
            return
        }

        this.last = text
        file.move(FileName, this.makeName())
        file.write(FileName, text, handler)
    }

    private static makeName() {
        const dt = new Date()
            .toISOString()
            .substr(0, 19)
            .replace('T', ' ')
            .replace(':', '.')
            .replace(':', '.')
        return BackupFolder + '/data.' + dt + '.json'
    }
}

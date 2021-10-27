import Handler from '../Bridge/FromJava/Handler'
import JavaWorker from '../Bridge/ToJava/JavaWorker'

const OAPIFolder = 'open-api'

export default class File {
    constructor(readonly worker: JavaWorker) {}

    static getOAPIPath(file: string) {
        return OAPIFolder + '/' + file
    }

    static getScriptPath(file: string) {
        return OAPIFolder + '/script/' + file
    }

    static getTemplatePath(file: string) {
        return OAPIFolder + '/template/' + file
    }

    move(file: string, destination: string, handler?: Handler) {
        return this.worker.move(file, destination, handler)
    }

    read(file: string, data: string, handler?: Handler) {
        return this.worker.read(file, data, handler)
    }

    readOAPI(file: string, data: string, handler?: Handler) {
        return this.read(File.getOAPIPath(file), data, handler)
    }

    saveDTS() {
        const FileName = 'index.d.ts'
        fetch(FileName)
            .then((response) => response.blob())
            .then((blob) => blob.text())
            .then((text) => {
                this.write(File.getOAPIPath(FileName), text)
            })
            .catch((errror) => console.log(errror))
    }

    write(file: string, data: string, handler?: Handler) {
        return this.worker.write(file, data, handler)
    }

    writeOAPI(data: string, handler?: Handler) {
        return this.write(File.getOAPIPath('openapi.json'), data, handler)
    }

    writeScript(file: string, data: string, handler?: Handler) {
        return this.write(File.getScriptPath(file), data, handler)
    }
}

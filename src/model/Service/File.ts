import Handler from '../Bridge/FromJava/Handler'
import JavaWorker from '../Bridge/ToJava/JavaWorker'

export const OAPIFolder = 'open-api'

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
        const LocalFile = File.getOAPIPath(FileName)
        fetch(FileName)
            .then((response) => response.blob())
            .then((blob) => blob.text())
            .then((text) => {
                this.write(LocalFile, text)
            })
            .catch((errror) => console.log(errror))
    }

    write(file: string, data: string, handler?: Handler) {
        return this.worker.write(file, data, handler)
    }

    writeOAPI(file: string, data: string, handler?: Handler) {
        return this.write(File.getOAPIPath(file), data, handler)
    }

    writeScript(file: string, data: string, handler?: Handler) {
        return this.write(File.getScriptPath(file), data, handler)
    }
}

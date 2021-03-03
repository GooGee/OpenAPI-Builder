import Handler from '../Bridge/FromJava/Handler'
import Route from '../Bridge/ToJava/Route'

export const OAPIFolder = 'open-api-gui'

export default class File {
    constructor(readonly route: Route) {}

    static getOAPIPath(file: string) {
        return OAPIFolder + '/' + file
    }

    static getScriptPath(file: string) {
        return OAPIFolder + '/script/' + file
    }

    move(file: string, destination: string, handler?: Handler) {
        return this.route.move(file, destination, handler)
    }

    read(file: string, data: string, handler?: Handler) {
        return this.route.read(file, data, handler)
    }

    readOAPI(file: string, data: string, handler?: Handler) {
        return this.read(File.getOAPIPath(file), data, handler)
    }

    write(file: string, data: string, handler?: Handler) {
        return this.route.write(file, data, handler)
    }

    writeOAPI(file: string, data: string, handler?: Handler) {
        return this.write(File.getOAPIPath(file), data, handler)
    }

    writeScript(file: string, data: string, handler?: Handler) {
        return this.write(File.getScriptPath(file), data, handler)
    }
}

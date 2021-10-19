import { ActionEnum } from '../FromJava/ActionEnum'
import Handler from '../FromJava/Handler'
import HandlerManager from '../FromJava/HandlerManager'
import Payload from './Payload'
import CEFW from '../CEFW'

export default class JavaWorker {
    constructor(readonly window: CEFW, readonly manager: HandlerManager) {}

    call(action: ActionEnum, key: string, data: string, handler?: Handler) {
        console.log(`${action} ${key}`)
        this.manager.add(action, key, handler)
        const payload = Payload.make(action, key, data)
        const text = JSON.stringify(payload)
        this.window.JavaEntry.call(text)
    }

    edit(file: string, data: string, handler?: Handler) {
        this.call(ActionEnum.edit, file, data, handler)
    }

    get(route: string, data: string, handler?: Handler) {
        this.call(ActionEnum.get, route, data, handler)
    }

    move(file: string, destination: string, handler?: Handler) {
        this.call(ActionEnum.move, file, destination, handler)
    }

    open(file: string, handler?: Handler) {
        this.call(ActionEnum.open, file, '', handler)
    }

    post(route: string, data: string, handler?: Handler) {
        this.call(ActionEnum.post, route, data, handler)
    }

    read(file: string, data: string, handler?: Handler) {
        this.call(ActionEnum.read, file, data, handler)
    }

    refresh(handler?: Handler) {
        this.call(ActionEnum.refresh, '', '', handler)
    }

    write(file: string, data: string, handler?: Handler) {
        this.call(ActionEnum.write, file, data, handler)
    }
}

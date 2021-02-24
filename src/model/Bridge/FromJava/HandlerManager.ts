import { ActionEnum } from './ActionEnum'
import Handler from './Handler'
import Response from './Response'

const CallBack = (data: Response) => {
    console.log(`Empty handler ${data.action} ${data.key}`)
}

export default class HandlerManager {
    readonly map = new Map<ActionEnum, Map<string, Handler>>()

    constructor() {
        Object.values(ActionEnum).forEach(key => {
            this.make(key)
        })
    }

    make(action: ActionEnum) {
        if (this.map.has(action)) {
            return
        }
        this.map.set(action, new Map<string, Handler>())
    }

    add(action: ActionEnum, key: string, handler: Handler = CallBack) {
        const map = this.map.get(action)
        if (map) {
            map.set(key, handler)
        }
    }

    find(action: ActionEnum, key: string) {
        if (this.map.has(action)) {
            const map = this.map.get(action)
            if (map) {
                return map.get(key)
            }
        }
        return undefined
    }
}

import { EventEnum } from '../Event/DialogueEvent'
import EventManager from '../Event/EventManager'

export default class Dialogue {
    callback: CallableFunction | null = null
    canClose = true
    hasFooter = false
    title = ''
    protected _visible = false
    size = 'lg'

    show(title: string, callback: CallableFunction | null = null) {
        this.title = title
        this.callback = callback
        this.visible = true
    }

    hide() {
        this.visible = false
    }

    get visible() {
        return this._visible
    }

    set visible(value: boolean) {
        if (value === this._visible) {
            return
        }
        this._visible = value
        EventManager.manager.dialogue.ee.emit(EventEnum.VisibilityChange, this)
    }
}

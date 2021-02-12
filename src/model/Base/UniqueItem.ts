import Listener from '../Event/Listener'
import lodash from 'lodash'
import Item from './Item'

export default class UniqueItem extends Item {
    protected _ui: string

    constructor(name: string) {
        super()
        this._ui = name
    }

    get camelCase() {
        return lodash.upperFirst(lodash.camelCase(this.ui))
    }

    get snakeCase() {
        return lodash.snakeCase(this.ui)
    }

    get wavelCase() {
        return lodash.camelCase(this.ui)
    }

    get ui() {
        return this._ui
    }

    set ui(name: string) {
        if (this.ui === name) {
            return
        }

        const old = this.ui
        Listener.listener.uiChangeListener.emitBeforeUIChange(this, name, old)
        this._ui = name
        Listener.listener.uiChangeListener.emitAfterUIChange(this, name, old)
        return
    }
}

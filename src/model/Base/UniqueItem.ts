import listener from '../Event/NameChangeListener'
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
        listener.emitBeforeUIChange(this, name, old)
        this._ui = name
        listener.emitAfterUIChange(this, name, old)
        return
    }

    get name() {
        return this.ui
    }

    set name(name: string) {
        this.ui = name
    }
}

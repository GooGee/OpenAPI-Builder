import lodash from 'lodash'
import { exclude, excludeOAPI, include } from './Decorator'
import Item from './Item'

export default class UniqueItem extends Item {
    @exclude
    @excludeOAPI
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

    @include
    get ui() {
        return this._ui
    }

    set ui(name: string) {
        if (this.ui === name) {
            return
        }

        this._ui = name
    }
}

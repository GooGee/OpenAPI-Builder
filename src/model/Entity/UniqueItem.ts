import lodash from 'lodash'
import { exclude, excludeOAPI, include } from '../Decorator'
import Item from './Item'

export default class UniqueItem extends Item {
    @excludeOAPI
    protected _ui: number = 0

    @exclude
    @excludeOAPI
    protected _un: string // unique name

    constructor(name: string) {
        super()
        this._un = name
    }

    get camelCase() {
        return lodash.upperFirst(lodash.camelCase(this.un))
    }

    get snakeCase() {
        return lodash.snakeCase(this.un)
    }

    get wavelCase() {
        return lodash.camelCase(this.un)
    }

    get ui() {
        return this._ui
    }

    set ui(ui: number) {
        if (this._ui === 0) {
            this._ui = ui
            return
        }
        throw new Error('Cannot change unique identifier')
    }

    @include
    get un() {
        return this._un
    }

    set un(name: string) {
        if (this.un === name) {
            return
        }

        this._un = name
    }
}

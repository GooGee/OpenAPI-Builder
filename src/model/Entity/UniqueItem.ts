import lodash from 'lodash'
import { exclude, excludeOAPI, include } from '../Decorator'
import Item from './Item'

export default class UniqueItem extends Item {
    @excludeOAPI
    private _id: number = 0

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

    get id() {
        return this._id
    }

    set id(id: number) {
        if (this._id === 0) {
            this._id = id
            return
        }
        throw new Error('Cannot change id')
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

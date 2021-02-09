import listener from '../Event/NameChangeListener'
import lodash from 'lodash'
import Item from './Item'

export default class UniqueItem extends Item {
    protected _name: string

    constructor(name: string) {
        super()
        this._name = name
    }

    get camelCase() {
        return lodash.upperFirst(lodash.camelCase(this.name))
    }

    get snakeCase() {
        return lodash.snakeCase(this.name)
    }

    get wavelCase() {
        return lodash.camelCase(this.name)
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        if (this.name === name) {
            return
        }

        const old = this.name
        listener.emitBeforeNameChange(this, name, old)
        this._name = name
        listener.emitAfterNameChange(this, name, old)
        return
    }
}

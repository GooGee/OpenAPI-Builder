// import _ = require('lodash')
import _ from 'lodash'
import Item from './Item'

export const NameRule = /^[A-Z_a-z][A-Z_a-z\d]*$/

export default abstract class NameItem extends Item {
    static checkValid: boolean = true
    protected _name: string

    constructor(name: string) {
        super()
        this._name = name
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        if (NameItem.checkValid) {
            this.throwIfInvalid(name)
        }
        this._name = name
    }

    get camelCase() {
        return _.upperFirst(_.camelCase(this.name))
    }

    get snakeCase() {
        return _.snakeCase(this.name)
    }

    throwIfInvalid(name: string) {
        if (NameRule.exec(name)) {
            return
        }
        throw new Error('Invalid name: ' + name)
    }

}
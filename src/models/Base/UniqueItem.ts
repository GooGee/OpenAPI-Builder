import Item from './Item'
import ee, { EventEnum } from '../Event'

export default class UniqueItem extends Item {
    protected _name: string

    constructor(name: string) {
        super()
        this._name = name
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        if (this.name === name) {
            return
        }

        const old = this.name
        ee.emit(EventEnum.BeforeNameChange, this, old, name)
        this._name = name
        ee.emit(EventEnum.AfterNameChange, this, old, name)
        return
    }

}
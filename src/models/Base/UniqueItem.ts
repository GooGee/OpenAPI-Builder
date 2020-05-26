import NameItem from './NameItem'
import ee, { EventEnum } from '../Event'

export default class UniqueItem extends NameItem {

    get name() {
        return this._name
    }

    set name(name: string) {
        this.setName(name)
    }

    setName(name: string) {
        if (this.name === name) {
            return false
        }

        const old = this.name
        ee.emit(EventEnum.BeforeNameChange, this, old, name)
        this._name = name
        ee.emit(EventEnum.AfterNameChange, this, old, name)
        return true
    }

}
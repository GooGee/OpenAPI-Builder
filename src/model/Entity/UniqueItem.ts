import lodash from 'lodash'
import { exclude, excludeOAPI, include } from '../Decorator'
import ReferenceFinderInterface from './ReferenceFinderInterface'
import UIItem from './UIItem'
import UniqueItemInterface from './UniqueItemInterface'

export default class UniqueItem extends UIItem implements UniqueItemInterface {
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

    toOAPI(finder: ReferenceFinderInterface) {
        return super.toOAPI(finder)
    }
}

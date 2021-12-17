import { exclude, excludeOAPI, include } from '../Decorator'
import Item from './Item'
import UIItemInterface from './UIItemInterface'

export default class UIItem extends Item implements UIItemInterface {
    @exclude
    @excludeOAPI
    protected _ui = 0

    protected get allowSetUI() {
        return false
    }

    @include
    get ui() {
        return this._ui
    }

    set ui(ui: number) {
        if (this._ui === 0 || this.allowSetUI) {
            this._ui = ui
            return
        }
        throw new Error('Cannot change unique identifier')
    }
}

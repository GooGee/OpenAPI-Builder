import { excludeOAPI } from '../Decorator'
import Item from './Item'

export default class UIItem extends Item {
    @excludeOAPI
    protected _ui = 0

    protected get allowSetUI() {
        return false
    }

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

import { excludeOAPI } from '../Decorator'
import Item from './Item'
import ItemManager from './ItemManager'

export default class UIItem extends Item {
    @excludeOAPI
    protected _ui: number = 0

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
}

export class UIItemManager<T extends UIItem> extends ItemManager<T> {
    private nextUI = 1

    add(item: T) {
        super.add(item)
        item.ui = this.nextUI
        this.nextUI += 1
    }

    load(manager: UIItemManager<T>) {
        manager.list.forEach((item) => {
            const iii = this.make()
            iii.load(item)
            this.list.push(iii)
        })
        this.nextUI = manager.nextUI ?? this.nextUI
    }
}

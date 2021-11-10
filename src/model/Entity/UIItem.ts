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
    protected nextUI = 1

    add(item: T) {
        super.add(item)
        item.ui = this.nextUI
        this.nextUI += 1
    }

    find(ui: number) {
        return this.list.find((item) => item.ui === ui)
    }

    load(manager: UIItemManager<T>) {
        manager.list.forEach((item) => {
            const ii = this.make()
            ii.load(item)
            if (ii.ui === 0) {
                this.add(ii)
            } else {
                this.list.push(ii)
            }
        })
        this.nextUI = manager.nextUI ?? this.nextUI
    }
}
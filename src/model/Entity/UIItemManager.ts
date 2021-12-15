import ItemManager from './ItemManager'
import UIItem from './UIItem'

export default class UIItemManager<T extends UIItem = UIItem> extends ItemManager<T> {
    protected nextUI = 1

    add(item: T) {
        this.throwIfFind(item.ui)
        super.add(item)
        item.ui = this.nextUI
        this.nextUI += 1
    }

    find(ui: number) {
        return this.list.find((item) => item.ui === ui)
    }

    findAll(uixx: number[]) {
        const set = new Set(uixx)
        return this.list.filter((item) => set.has(item.ui))
    }

    has(ui: number) {
        return this.find(ui) !== undefined
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

    throwIfFind(ui: number) {
        if (this.find(ui)) {
            throw new Error(`${this.type.name} already exists!`)
        }
    }

    toUIArray() {
        return this.list.map((item) => item.ui)
    }
}

import ItemManager from './ItemManager'
import UIItemInterface from './UIItemInterface'
import UIItemManagerInterface from './UIItemManagerInterface'

export default class UIItemManager<T extends UIItemInterface = UIItemInterface>
    extends ItemManager<T>
    implements UIItemManagerInterface
{
    protected _nextUI = 1

    get nextUI() {
        return this._nextUI
    }

    add(item: T) {
        this.throwIfFind(item.ui)
        super.add(item)
        item.ui = this._nextUI
        this._nextUI += 1
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

    load(manager: UIItemManagerInterface<T>) {
        manager.list.forEach((item) => {
            const ii = this.loadItem(item)
            ii.load(item)
            if (ii.ui === 0) {
                this.add(ii)
            } else {
                this.list.push(ii)
            }
        })
        this._nextUI = manager.nextUI ?? this._nextUI
    }

    protected loadItem(item: T) {
        return this.make()
    }

    remove(item: T) {
        const index = this.list.findIndex((one) => one.ui === item.ui)
        if (index >= 0) {
            this.list.splice(index, 1)
        }
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

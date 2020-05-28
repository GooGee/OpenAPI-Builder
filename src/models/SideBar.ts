import Item from "./Base/Item"
import ItemList from "./Base/ItemList"

export default class SideBar {
    title: string = ''
    item: Item | null = null
    manager: ItemList<Item> | null = null

    get first() {
        if (this.manager) {
            if (this.manager.list.length) {
                return this.manager.list[0]
            }
        }
        return null
    }

    show(title: string, manager: ItemList<Item>, item: Item | null = null) {
        this.title = title
        if (Object.is(manager, this.manager)) {
            return
        }

        this.manager = manager
        if (item) {
            this.item = item
            return
        }

        this.item = this.first
    }
}
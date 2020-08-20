import Item from "./Base/Item"
import ItemList from "./Base/ItemList"
import NameValue from "./Specification/NameValue"

export default class SideBar {
    title: string = ''
    search: string = ''
    item: Item | null = null
    manager: ItemList<NameValue> | null = null

    get first() {
        if (this.manager) {
            if (this.manager.list.length) {
                return this.manager.list[0]
            }
        }
        return null
    }

    get list() {
        if (this.manager) {
            if (this.search) {
                const re = new RegExp(this.search, 'i')
                return this.manager.list.filter(item => re.test(item.name))
            }
            return this.manager.list
        }
        return []
    }

    show(title: string, manager: ItemList<NameValue>, item: Item | null = null) {
        this.title = title
        if (Object.is(manager, this.manager)) {
            return
        }

        this.manager = manager
        this.search = ''
        if (item) {
            this.item = item
            return
        }

        this.item = this.first
    }
}
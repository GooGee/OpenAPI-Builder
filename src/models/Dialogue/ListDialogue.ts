import Dialogue from "./Dialogue"
import Item from "../Base/Item"
import UniqueItem from "../Base/UniqueItem"

export default class ListDialogue extends Dialogue {
    keyword: string = ''
    list: Array<UniqueItem> = []
    selected: Item | null = null
    showBlank: boolean = false

    get filtered() {
        if (this.keyword) {
            const re = new RegExp(this.keyword, 'i')
            return this.list.filter(item => item.name.search(re) > -1)
        }

        return this.list
    }

    showList(list: Array<UniqueItem>, title: string, callback: CallableFunction) {
        this.list = list
        this.keyword = ''
        this.selected = null
        this.showBlank = false
        super.show(title, callback)
    }

    showWithBlank(list: Array<UniqueItem>, title: string, callback: CallableFunction) {
        this.showList(list, title, callback)
        this.showBlank = true
    }

    select(item: Item) {
        this.selected = item
        if (this.callback) {
            this.callback(true)
        }
    }
}
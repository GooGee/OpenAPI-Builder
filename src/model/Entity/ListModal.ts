import { filter } from '../Service/Text'
import Modal from './Modal'
import UniqueItem from './UniqueItem'

interface CallBack {
    (item: UniqueItem): void
}

export default class ListModal extends Modal {
    keyword = ''
    source: Array<UniqueItem> = []
    withBlank = false

    get list() {
        if (this.keyword) {
            return filter(this.keyword, this.source)
        }

        return this.source
    }

    select(item: UniqueItem) {
        if (this.callback) {
            this.callback(item)
        }
        this.hide()
    }

    showList(list: Array<UniqueItem>, title: string, callback: CallBack) {
        this.source = list
        this.keyword = ''
        this.withBlank = false
        super.show(title, callback)
    }

    showWithBlank(list: Array<UniqueItem>, title: string, callback: CallBack) {
        this.showList(list, title, callback)
        this.withBlank = true
    }
}

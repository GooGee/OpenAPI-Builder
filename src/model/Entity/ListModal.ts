import { filter } from '../Service/Text'
import Modal from './Modal'
import UniqueItem from './UniqueItem'

interface CallBack<T extends UniqueItem> {
    (item: T): void
}

export default class ListModal extends Modal {
    keyword = ''
    source: Array<UniqueItem> = []
    showBlank = false

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

    showList<T extends UniqueItem>(
        list: Array<T>,
        title: string,
        callback: CallBack<T>,
    ) {
        this.source = list
        this.keyword = ''
        this.showBlank = false
        super.show(title, callback)
    }

    showWithBlank<T extends UniqueItem>(
        list: Array<T>,
        title: string,
        callback: CallBack<T>,
    ) {
        this.showList(list, title, callback)
        this.showBlank = true
    }
}

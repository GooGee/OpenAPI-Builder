import { filter } from '../Service/Text'
import Modal from './Modal'
import UniqueItemInterface from './UniqueItemInterface'

interface CallBack {
    (item: UniqueItemInterface): void
}

export default class ListModal extends Modal {
    keyword = ''
    source: Array<UniqueItemInterface> = []
    withBlank = false

    get list() {
        if (this.keyword) {
            return filter(this.keyword, this.source)
        }

        return this.source
    }

    select(item: UniqueItemInterface) {
        if (this.callback) {
            this.callback(item)
        }
        this.hide()
    }

    showList(list: Array<UniqueItemInterface>, title: string, callback: CallBack) {
        this.source = list
        this.keyword = ''
        this.withBlank = false
        super.show(title, callback)
    }

    showWithBlank(list: Array<UniqueItemInterface>, title: string, callback: CallBack) {
        this.showList(list, title, callback)
        this.withBlank = true
    }
}

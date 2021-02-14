import Dialogue from './Dialogue'
import { filter } from '../Service/Text'
import UniqueItem from '../Base/UniqueItem'

export default class ListDialogue extends Dialogue {
    keyword = ''
    source: Array<UniqueItem> = []
    showBlank = false

    get list() {
        if (this.keyword) {
            return filter(this.keyword, this.source)
        }

        return this.source
    }

    showList(list: Array<UniqueItem>, title: string, callback: CallableFunction, size = 'md') {
        this.source = list
        this.keyword = ''
        this.showBlank = false
        this.size = size
        super.show(title, callback)
    }

    showWithBlank(list: Array<UniqueItem>, title: string, callback: CallableFunction, size = 'md') {
        this.showList(list, title, callback, size)
        this.showBlank = true
    }

    select(item: UniqueItem) {
        if (this.callback) {
            this.callback(item)
        }
    }
}

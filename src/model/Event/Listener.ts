import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import ItemDeleteListener from './ItemDeleteListener'
import UIChangeListener from './UIChangeListener'

export default class Listener {
    static readonly listener = new Listener()

    readonly itemDeleteListener = new ItemDeleteListener<
        UniqueItemManager<UniqueItem>,
        UniqueItem
    >()
    readonly uiChangeListener = new UIChangeListener<UniqueItem>()

    constructor() {
        this.itemDeleteListener.ee.setMaxListeners(111222333)
        this.uiChangeListener.ee.setMaxListeners(111222333)
    }
}

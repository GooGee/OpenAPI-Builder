import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import ItemDelete from './ItemDelete'
import StateEvent from './StateEvent'
import UIChange from './UIChange'

export default class EventManager {
    static readonly manager = new EventManager()

    readonly itemDelete = new ItemDelete<UniqueItemManager<UniqueItem>, UniqueItem>()
    readonly state = new StateEvent()
    readonly uiChange = new UIChange<UniqueItem>()

    constructor() {
        this.itemDelete.ee.setMaxListeners(111222333)
        this.state.ee.setMaxListeners(11)
        this.uiChange.ee.setMaxListeners(111222333)
    }
}

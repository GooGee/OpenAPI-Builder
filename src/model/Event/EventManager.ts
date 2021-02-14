import UniqueItem from '../Base/UniqueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import DialogueEvent from './DialogueEvent'
import ItemDelete from './ItemDelete'
import UIChange from './UIChange'

export default class EventManager {
    static readonly manager = new EventManager()

    readonly dialogue = new DialogueEvent()
    readonly itemDelete = new ItemDelete<UniqueItemManager<UniqueItem>, UniqueItem>()
    readonly uiChange = new UIChange<UniqueItem>()

    constructor() {
        this.itemDelete.ee.setMaxListeners(111222333)
        this.uiChange.ee.setMaxListeners(111222333)
    }
}

import SideBarItem from '../Base/SideBarItem'
import UniqueItemManager from '../Base/UniqueItemManager'

export default class Link extends SideBarItem {}

export class LinkManager extends UniqueItemManager<Link> {
    constructor() {
        super(Link)
    }
}

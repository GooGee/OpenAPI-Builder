import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'

export default class Link extends SideBarItem {}

export class LinkManager extends UniqueItemManager<Link> {
    constructor() {
        super(Link)
    }
}

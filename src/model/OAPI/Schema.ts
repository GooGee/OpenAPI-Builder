import XML from './XML'
import SideBarItem from '../Base/SideBarItem'

export default abstract class Schema extends SideBarItem {
    deprecated = false
    nullable = false
    readOnly = false
    writeOnly = false

    // readonly xml = new XML
}

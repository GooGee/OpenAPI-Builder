import XML from './XML'
import UniqueItem from '../Base/UniqueItem'

export default abstract class Schema extends UniqueItem {
    deprecated = false
    nullable = false
    readOnly = false
    writeOnly = false

    // readonly xml = new XML
}

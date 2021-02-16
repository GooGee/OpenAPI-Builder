import Discriminator from './Discriminator'
import KeyValue from '../Base/KeyValue'
import XML from './XML'
import UniqueItem from '../Base/UniqueItem'

export default abstract class Schema extends UniqueItem {
    deprecated = false
    isArray = false
    nullable = false
    readOnly = false
    required = true
    writeOnly = false

    example = ''
    format = ''

    // readonly discriminator = new Discriminator
    // readonly xml = new XML

    makeArray() {
        const data: KeyValue = {
            required: this.required,
            type: 'array',
            items: this.makeData(),
        }
        return data
    }

    abstract makeData(): KeyValue

    toOAPI() {
        if (this.isArray) {
            return this.makeArray()
        }

        const data = this.makeData()
        data.required = this.required
        return data
    }
}

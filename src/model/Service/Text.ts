import lodash from 'lodash'
import ColorEnum from '../Entity/ColorEnum'
import UniqueItem from '../Entity/UniqueItem'
import Vendor from '../Vendor'
import Factory from './Factory'

export function filter(keyword: string, list: Array<UniqueItem>) {
    const re = new RegExp(keyword, 'i')
    return list.filter((item) => item.un.search(re) > -1)
}

function run(code: string, vendor: Vendor, schema?: UniqueItem) {
    const data = {
        ColorEnum,
        factory: new Factory(vendor.project),
        lodash,
        project: vendor.project,
        schema,
        vendor,
    }
    const ff: Function = new Function(`"use strict";return (${code})`)()
    return ff(data)
}

function runText(text: string, data: object): string {
    return new Function(`"use strict";return (\`${text}\`);`)(data)
}

const Text = {
    filter,
    run,
    runText,
}

export default Text

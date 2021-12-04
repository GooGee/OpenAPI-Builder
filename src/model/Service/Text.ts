import lodash from 'lodash'
import ColorEnum from '../Entity/ColorEnum'
import UniqueItem from '../Entity/UniqueItem'
import Vendor from '../Vendor'
import Factory from './Factory'

export function filter(keyword: string, list: Array<UniqueItem>) {
    const re = new RegExp(keyword, 'i')
    return list.filter((item) => item.un.search(re) > -1)
}

function run(code: string, vendor: Vendor, schema?: UniqueItem, un?: string) {
    const data = {
        ColorEnum,
        factory: new Factory(vendor.project),
        lodash,
        project: vendor.project,
        schema,
        un,
        vendor,
    }
    return runFunction(code, data)
}

function runFunction(code: string, data: object) {
    const ff: Function = new Function(`"use strict";return (${code})`)()
    return ff(data)
}

function runText(text: string, data: object): string {
    return new Function(...Object.keys(data), `return (\`${text}\`);`)(
        ...Object.values(data),
    )
}

const Text = {
    filter,
    run,
    runFunction,
    runText,
}

export default Text

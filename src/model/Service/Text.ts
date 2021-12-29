import lodash from 'lodash'
import ColorEnum from '../Entity/ColorEnum'
import LayerOperation from '../Entity/LayerOperation'
import LayerPath from '../Entity/LayerPath'
import UniqueItemInterface from '../Entity/UniqueItemInterface'
import Schema from '../OAPI/Schema'
import Vendor from '../Vendor'

export function filter(keyword: string, list: Array<UniqueItemInterface>) {
    const re = new RegExp(keyword, 'i')
    return list.filter((item) => item.un.search(re) > -1)
}

function getUN(
    pattern: string,
    schema: Schema,
    path: LayerPath,
    operation: LayerOperation,
) {
    if (pattern === '') {
        return ''
    }
    return parse(pattern, { operation, path, schema })
}

function parse(text: string, data: object): string {
    return new Function(...Object.keys(data), `return (\`${text}\`);`)(
        ...Object.values(data),
    )
}

function run(code: string, vendor: Vendor, schema?: UniqueItemInterface, un?: string) {
    const data = {
        ColorEnum,
        factory: vendor.factory,
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

const Text = {
    filter,
    getUN,
    parse,
    run,
    runFunction,
}

export default Text

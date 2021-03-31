import SchemaSimple, { SchemaSimpleManager } from '@/model/OAPI/SchemaSimple'
import { StringObject } from './parseCSV'

export function convert<T>(data: StringObject[], map: Map<string, string>) {
    const list: T[] = []
    const keyxx = map.keys()
    data.forEach(item => {
        const one = {} as StringObject
        Array.from(keyxx).forEach(key => {
            if (item[key]) {
                one[map.get(key)!] = item[key]
            }
        })
    })
    return list
}

export function convertToSchema(data: StringObject[], map: Map<string, string>) {
    const list = convert<SchemaSimple>(data, map)
    const manager = new SchemaSimpleManager()
    list.forEach(item => {
        const ui = manager.make(item.ui)
        if (item.type) {
            ui.type = item.type
        }
        if (item.format) {
            ui.format = item.format
        }
        manager.add(ui)
    })
    return manager.list
}

export interface MapObject {
    name: string
    value: string
}

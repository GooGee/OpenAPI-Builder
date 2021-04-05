import { StringObject } from './parseCSV'

export function convert(data: StringObject[], map: Map<string, string>) {
    const list: StringObject[] = []
    const keyxx = Array.from(map.keys())
    data.forEach(item => {
        const one = {} as StringObject
        keyxx.forEach(key => {
            if (item[key]) {
                one[map.get(key)!] = item[key]
                if (list.includes(one)) {
                    return
                }
                list.push(one)
            }
        })
    })
    return list
}

export interface MapObject {
    name: string
    value: string
}

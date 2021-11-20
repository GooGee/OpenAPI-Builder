import ObjectMap from '../Entity/ObjectMap'

export function migrate(data: ObjectMap[], keymap: Map<string, string>) {
    // console.log(keymap)
    const list: ObjectMap[] = []
    const keyxx = Array.from(keymap.keys())
    data.forEach((item) => {
        const one = {} as ObjectMap
        keyxx.forEach((key) => {
            const itemKey = keymap.get(key)
            if (itemKey) {
                if (item[itemKey]) {
                    one[key] = item[itemKey]
                    if (list.includes(one)) {
                        return
                    }
                    list.push(one)
                }
            }
        })
    })
    // console.log(list)
    return list
}

const Converter = {
    migrate,
}

export default Converter

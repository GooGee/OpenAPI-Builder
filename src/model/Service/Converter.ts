import StringObject from '../Entity/StringObject'

export function migrate(data: StringObject[], keymap: Map<string, string>) {
    // console.log(keymap)
    const list: StringObject[] = []
    const keyxx = Array.from(keymap.keys())
    data.forEach((item) => {
        const one = {} as StringObject
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

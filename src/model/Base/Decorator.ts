const excludedMap = new Map<Function, string[]>()
const includedMap = new Map<Function, string[]>()

export const exclude = (target: Object, propertyKey: string) => {
    setMap(target.constructor, propertyKey, excludedMap)
}

export const include = (target: Object, propertyKey: string) => {
    setMap(target.constructor, propertyKey, includedMap)
}

export const getExcludedList = (constructor: Function) => getList(constructor, excludedMap)

export const getIncludedList = (constructor: Function) => getList(constructor, includedMap)

function getList(constructor: Function, map: Map<Function, string[]>) {
    let list: string[] = []
    let baseClass = constructor

    while (baseClass) {
        const found = map.get(baseClass)
        if (found) {
            list = list.concat(found)
        }
        const newBaseClass = Object.getPrototypeOf(baseClass)
        if (newBaseClass === Object) {
            break
        }
        baseClass = newBaseClass
    }

    return list
}

function setMap(constructor: Function, propertyKey: string, map: Map<Function, string[]>) {
    let list = map.get(constructor)
    if (list === undefined) {
        list = []
        map.set(constructor, list)
    }
    list.push(propertyKey)
}

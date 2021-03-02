const excludedMap = new Map<Function, string[]>()
const includedMap = new Map<Function, string[]>()
const excludedOAPIMap = new Map<Function, string[]>()
const includedOAPIMap = new Map<Function, string[]>()

function makeList(constructor: Function, map: Map<Function, string[]>) {
    let list: string[] = []
    let baseClass = constructor

    while (baseClass) {
        const newBaseClass = Object.getPrototypeOf(baseClass)
        if (newBaseClass === Object) {
            break
        }
        baseClass = newBaseClass
        const found = map.get(baseClass)
        if (found) {
            list = list.concat(found)
        }
    }

    return list
}

function getList(constructor: Function, map: Map<Function, string[]>) {
    let list = map.get(constructor)
    if (list === undefined) {
        list = makeList(constructor, map)
        map.set(constructor, list)
    }
    return list
}

function setMap(constructor: Function, propertyKey: string, map: Map<Function, string[]>) {
    let list = map.get(constructor)
    if (list === undefined) {
        list = makeList(constructor, map)
        map.set(constructor, list)
    }
    list.push(propertyKey)
}

export const exclude = (target: Record<string, any>, propertyKey: string) => {
    setMap(target.constructor, propertyKey, excludedMap)
}

export const include = (target: Record<string, any>, propertyKey: string) => {
    setMap(target.constructor, propertyKey, includedMap)
}

export const getExcludedList = (constructor: Function) => getList(constructor, excludedMap)

export const getIncludedList = (constructor: Function) => getList(constructor, includedMap)

export const excludeOAPI = (target: Record<string, any>, propertyKey: string) => {
    setMap(target.constructor, propertyKey, excludedOAPIMap)
}

export const includeOAPI = (target: Record<string, any>, propertyKey: string) => {
    setMap(target.constructor, propertyKey, includedOAPIMap)
}

export const getOAPIExcludedList = (constructor: Function) => getList(constructor, excludedOAPIMap)

export const getOAPIIncludedList = (constructor: Function) => getList(constructor, includedOAPIMap)

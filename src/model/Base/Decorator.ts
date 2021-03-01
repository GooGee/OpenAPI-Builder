const excludedMap = new Map<Function, string[]>()
const includedMap = new Map<Function, string[]>()

export const exclude = (target: Record<string, any>, propertyKey: string) => {
    const fff = target.constructor
    let list = excludedMap.get(fff)
    if (!list) {
        list = []
        excludedMap.set(fff, list)
    }
    list.push(propertyKey)
}

function getBase(targetClass: Function) {
    let baseClass = targetClass

    while (baseClass) {
        const newBaseClass = Object.getPrototypeOf(baseClass)
        if (newBaseClass === Object) {
            break
        }

        if (newBaseClass && newBaseClass.name) {
            baseClass = newBaseClass
        } else {
            break
        }
    }

    return baseClass
}

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

export const getExcludedList = (constructor: Function) => getList(constructor, excludedMap)

export const getIncludedList = (constructor: Function) => getList(constructor, includedMap)

export const include = (target: Record<string, any>, propertyKey: string) => {
    const fff = target.constructor
    let list = includedMap.get(fff)
    if (!list) {
        list = []
        includedMap.set(fff, list)
    }
    list.push(propertyKey)
}

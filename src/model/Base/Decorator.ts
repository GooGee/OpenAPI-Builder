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

export const getExcludedList = (constructor: Function) => excludedMap.get(constructor)

export const getIncludedList = (constructor: Function) => includedMap.get(constructor)

export const include = (target: Record<string, any>, propertyKey: string) => {
    const fff = target.constructor
    let list = includedMap.get(fff)
    if (!list) {
        list = []
        includedMap.set(fff, list)
    }
    list.push(propertyKey)
}

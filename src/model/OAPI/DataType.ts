export enum CompositionType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    multipleOf = 'multipleOf',
    oneOf = 'oneOf',
}

const object = 'object'

export enum SimpleType {
    boolean = 'boolean',
    integer = 'integer',
    number = 'number',
    reference = 'reference',
    string = 'string',
    template = 'template',
}

export const DataType = { ...CompositionType, object, ...SimpleType }

export const compositionTypeList = Object.values(CompositionType)

export const dataTypeList = Object.values(DataType)

export const simpleTypeList = Object.values(SimpleType)

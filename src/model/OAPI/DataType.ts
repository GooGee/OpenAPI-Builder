export enum CompositionType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    multipleOf = 'multipleOf',
    oneOf = 'oneOf',
}

enum DataType {
    boolean = 'boolean',
    enumer = 'enumer',
    integer = 'integer',
    number = 'number',
    reference = 'reference',
    string = 'string',
}

export const compositionTypeList = Object.values(CompositionType)

export const dataTypeList = Object.values(DataType)

export default DataType

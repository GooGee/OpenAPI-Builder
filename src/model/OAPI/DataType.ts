export enum ComplexType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    multipleOf = 'multipleOf',
    object = 'object',
    oneOf = 'oneOf',
}

export enum SimpleType {
    boolean = 'boolean',
    integer = 'integer',
    number = 'number',
    reference = 'reference',
    string = 'string',
}

export default class DataType {
    constructor(readonly name: string) {}
}

const typexx = { ...ComplexType, ...SimpleType }

export const complexTypeList = Object.values(ComplexType)

export const dataTypeList = Object.values(typexx)

export const simpleTypeList = Object.values(SimpleType)

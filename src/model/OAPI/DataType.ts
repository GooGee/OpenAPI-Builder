export enum CompositionType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    multipleOf = 'multipleOf',
    oneOf = 'oneOf',
}

export enum SimpleType {
    boolean = 'boolean',
    integer = 'integer',
    number = 'number',
    reference = 'reference',
    string = 'string',
    template = 'template',
}

export const compositionTypeList = Object.values(CompositionType)

export const simpleTypeList = Object.values(SimpleType)

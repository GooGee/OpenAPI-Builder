
export enum DataType {
    array = 'array',
    boolean = 'boolean',
    composition = 'composition',
    integer = 'integer',
    number = 'number',
    object = 'object',
    reference = 'reference',
    string = 'string',
}

export function isPrimitive(type: DataType) {
    return ['boolean', 'integer', 'number', 'string'].indexOf(type) > -1
}

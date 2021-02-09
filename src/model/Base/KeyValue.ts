import Item from './Item'

export default interface KeyValue {
    [key: string]: boolean | Item | KeyValue | number | object | string
}

import ObjectMap from './ObjectMap'

export default interface ItemInterface {
    getKeyList(): string[]
    getOAPIKeyList(): string[]
    load(data: ItemInterface): void
    toJSON(): ObjectMap<any>
    toOAPI(...args: any[]): ObjectMap<any>
}

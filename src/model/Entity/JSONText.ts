import Item from './Item'

export default class JSONText extends Item {
    value: Object = {}

    get text() {
        return JSON.stringify(this.value, undefined, 4)
    }

    set text(text: string) {
        this.value = JSON.parse(text)
    }

    toOAPI(): Object {
        return this.value
    }
}

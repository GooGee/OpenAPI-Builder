import Item from './Item'

export default class JSONText extends Item {
    value = {}

    get text() {
        return JSON.stringify(this.value)
    }

    set text(text: string) {
        this.value = JSON.parse(text)
    }

    toOAPI() {
        return this.value
    }
}

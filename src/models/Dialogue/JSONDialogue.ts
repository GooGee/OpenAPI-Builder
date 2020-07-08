import Dialogue from "./Dialogue"

export default class JSONDialogue extends Dialogue {
    text: string = ''
    itemName: string = 'Schema'

    get url() {
        const name = this.itemName.toLowerCase()
        return `https://googee.github.io/OpenAPI/docs/classes/${name}.html`
    }

    ok() {
        if (this.callback) {
            this.callback(this.text)
        }
    }
}
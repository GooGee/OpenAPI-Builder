import Dialogue from "./Dialogue"

export default class JSONDialogue extends Dialogue {
    text: string = ''
    itemName: string = 'Schema'

    get url() {
        return `https://googee.github.io/OpenAPI/docs/classes/${this.itemName}.html`
    }

    ok() {
        if (this.callback) {
            this.callback(this.text)
        }
    }
}
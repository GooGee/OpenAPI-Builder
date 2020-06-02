import Dialogue from "./Dialogue"

export default class JSONDialogue extends Dialogue {
    text: string = ''

    ok() {
        if (this.callback) {
            this.callback(this.text)
        }
    }
}
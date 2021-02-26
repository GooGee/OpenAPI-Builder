import Dialogue from './Dialogue'

export default class UIDialogue extends Dialogue {
    size = 'sm'
    text = ''

    showInput(title: string, text = '', callback: CallableFunction | null = null) {
        this.title = title
        this.text = text
        super.show(title, callback)
    }
}

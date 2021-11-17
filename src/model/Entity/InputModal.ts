import Modal from './Modal'

interface CallBack {
    (): boolean
}

export default class InputModal extends Modal {
    text = ''
    size = 'modal-lg'

    ok() {
        if (this.callback) {
            const cancel = this.callback()
            if (cancel) {
                return
            }
        }
        this.hide()
    }

    show(title: string, callback: CallBack) {
        super.show(title, callback)
    }
}

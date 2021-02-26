export default class Dialogue {
    callback: CallableFunction | null = null
    canClose = true
    hasFooter = false
    title = ''
    size = 'lg'
    visible = false

    show(title: string, callback: CallableFunction | null = null) {
        this.title = title
        this.callback = callback
        this.visible = true
    }
}

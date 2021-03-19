import Noty from 'noty'

function error(message: string) {
    new Noty({
        text: message,
        theme: 'bootstrap-v4',
        type: 'error',
    }).show()
}

function toast(message: string) {
    new Noty({
        text: message,
        theme: 'bootstrap-v4',
        timeout: 2333,
        type: 'info',
    }).show()
}

function show(message: string, status: number) {
    if (status === 200) {
        toast(message)
        return
    }

    error(message)
}

function warn(message: string) {
    new Noty({
        text: message,
        theme: 'bootstrap-v4',
        type: 'warning',
    }).show()
}

export default {
    error,
    show,
    toast,
    warn,
}

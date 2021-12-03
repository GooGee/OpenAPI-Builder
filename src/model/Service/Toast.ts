import { Notyf } from 'notyf'

const notyf = new Notyf({
    ripple: false,
})

function error(error: any) {
    const message = error?.message ?? error
    notyf.error({
        dismissible: true,
        duration: 0,
        message,
    })
}

function show(message: string, code: number) {
    if (code < 300) {
        return success(message)
    }
    error(message)
}

function success(message: string) {
    notyf.success(message)
}

const Toast = {
    error,
    show,
    success,
}

export default Toast

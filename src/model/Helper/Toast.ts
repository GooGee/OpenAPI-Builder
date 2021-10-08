import { Notyf } from 'notyf'

const notyf = new Notyf({
    ripple: false,
})

function error(message: string) {
    notyf.error({
        dismissible: true,
        duration: 0,
        message,
    })
}

function success(message: string) {
    notyf.success(message)
}

const Toast = {
    error,
    success,
}

export default Toast

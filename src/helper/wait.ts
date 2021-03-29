import { ref } from 'vue'
import toast from './toast'

export default function wait(callback: Function) {
    const waiting = ref(false)

    function stopWaiting(timeout = 1222) {
        setTimeout(() => {
            waiting.value = false
        }, timeout)
    }

    const run = () => {
        if (waiting.value) {
            return
        }

        waiting.value = true
        try {
            callback()
        } catch (error) {
            stopWaiting()
            toast.error(error.message)
        }
    }

    return { run, stopWaiting, waiting }
}

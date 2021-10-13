import { ref } from 'vue'
import Toast from './Toast'

function wait(callback: Function) {
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
            Toast.error(error.message)
        }
    }

    return { run, stopWaiting, waiting }
}

const Timer = {
    wait,
}

export default Timer

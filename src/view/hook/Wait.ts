import Noty from 'noty'
import { ref } from 'vue'

export default function(run: Function) {
    const waiting = ref(false)

    function stopWaiting(timeout = 1112) {
        setTimeout(() => {
            waiting.value = false
        }, timeout)
    }

    const call = () => {
        if (waiting.value) {
            return
        }

        waiting.value = true
        try {
            run()
        } catch (error) {
            stopWaiting()
            new Noty({
                text: error.message,
                theme: 'bootstrap-v4',
                type: 'error',
            }).show()
        }
    }

    return { call, stopWaiting, waiting }
}

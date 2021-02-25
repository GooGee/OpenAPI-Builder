import Noty from 'noty'
import { ref } from 'vue'

export default function(run: Function) {
    const waiting = ref(false)

    const call = () => {
        if (waiting.value) {
            return
        }

        waiting.value = true
        try {
            run()
        } catch (error) {
            waiting.value = false
            new Noty({
                text: error.message,
                theme: 'bootstrap-v4',
                type: 'error',
            }).show()
        }
    }

    return { call, waiting }
}

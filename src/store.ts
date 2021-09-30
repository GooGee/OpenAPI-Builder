import { reactive } from 'vue'

const store = reactive({
    ready: false,
})

export function setReady() {
    store.ready = true
}

export default store

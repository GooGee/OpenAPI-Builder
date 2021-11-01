import { reactive } from 'vue'

const store = reactive({
    loading: true,
    ready: false,
})

export function setLoading() {
    store.loading = false
}

export function setReady() {
    store.ready = true
}

export default store

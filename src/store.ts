import { reactive } from 'vue'
import InputModal from './model/Entity/InputModal'
import ListModal from './model/Entity/ListModal'

const store = reactive({
    inputModal: new InputModal(),
    listModal: new ListModal(),
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

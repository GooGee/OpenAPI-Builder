<template>
    <Modal v-model:visible="store.listModal.visible" :size="store.listModal.size">
        <div class="modal-header">
            {{ store.listModal.title }}
        </div>
        <div class="modal-body">
            <input
                v-model="store.listModal.keyword"
                ref="listInput"
                placeholder="search"
                type="text"
                class="form-control mb11"
            />
            <ul class="list-group">
                <li
                    v-if="store.listModal.withBlank"
                    @click="store.listModal.select(null)"
                    class="list-group-item pointer"
                >
                    ----
                </li>
                <li
                    v-for="item in store.listModal.list"
                    :key="item.ui"
                    @click="store.listModal.select(item)"
                    class="list-group-item pointer"
                >
                    {{ item.un }}
                </li>
            </ul>
        </div>
    </Modal>
</template>

<script lang="ts">
import store from '@/store'
import { defineComponent } from 'vue'
import Modal from './Modal.vue'

export default defineComponent({
    components: {
        Modal,
    },
    setup(props, context) {
        return {
            store,
        }
    },
})
</script>

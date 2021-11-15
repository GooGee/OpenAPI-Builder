<template>
    <Modal v-model:visible="store.inputModal.visible" :size="store.inputModal.size">
        <div class="modal-header">
            {{ store.inputModal.title }}
        </div>
        <div class="modal-body">
            <textarea
                v-model="store.inputModal.text"
                class="form-control"
                rows="11"
                spellcheck="false"
            ></textarea>
        </div>
        <div class="modal-footer">
            <span @click="hide(true)" class="btn btn-outline-primary mt11">OK</span>
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
        function hide() {
            store.inputModal.ok()
        }
        return {
            hide,
            store,
        }
    },
})
</script>

<template>
    <Modal v-model:visible="modalData.visible" :size="modalData.size">
        <div class="modal-header">
            {{ modalData.title }}
        </div>
        <div class="modal-body">
            <textarea
                v-model="modalData.text"
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
import ModalData from '@/model/Entity/Modal'
import { defineComponent, PropType } from 'vue'
import Modal from './Modal.vue'

export default defineComponent({
    components: {
        Modal,
    },
    props: {
        modalData: {
            type: Object as PropType<ModalData>,
            required: true,
        },
    },
    setup(props, context) {
        function hide() {
            props.modalData.hide()
        }
        return {
            hide,
        }
    },
})
</script>

<template>
    <Modal v-model:visible="listModalData.visible">
        <div class="modal-header">
            {{ listModalData.title }}
        </div>
        <div class="modal-body">
            <input
                v-model="listModalData.keyword"
                ref="listInput"
                placeholder="search"
                type="text"
                class="form-control mb11"
            />
            <ul class="list-group">
                <li
                    v-if="listModalData.showBlank"
                    @click="listModalData.select(null)"
                    class="list-group-item pointer"
                >
                    ----
                </li>
                <li
                    v-for="item in listModalData.list"
                    :key="item.id"
                    @click="listModalData.select(item)"
                    class="list-group-item pointer"
                >
                    {{ item.un }}
                </li>
            </ul>
        </div>
    </Modal>
</template>

<script lang="ts">
import ListModal from '@/model/Entity/ListModal'
import { defineComponent, PropType } from 'vue'
import Modal from './Modal.vue'

export default defineComponent({
    components: {
        Modal,
    },
    props: {
        listModalData: {
            type: Object as PropType<ListModal>,
            required: true,
        },
    },
})
</script>

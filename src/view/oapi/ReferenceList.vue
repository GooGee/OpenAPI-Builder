<template>
    <div v-for="item in list" :key="item.ui" class="mb11">
        <div class="btn-group">
            <DeleteButton
                :manager="manager"
                :item="manager.find(item.ui)"
            ></DeleteButton>
            <span class="btn btn-outline-secondary"> {{ item.un }} </span>
            <slot></slot>
        </div>
    </div>
    <span @click="select" class="btn btn-outline-primary"> + </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import { ReferenceManager } from '@/model/OAPI/Reference'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import store from '@/store'
import { defineComponent, PropType, ref, watch } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'

const ReferenceList = defineComponent({
    components: {
        DeleteButton,
    },
    props: {
        manager: {
            type: Object as PropType<ReferenceManager>,
            required: true,
        },
    },
    setup(props, context) {
        const list = ref<UniqueItem[]>([])
        const source = ss.finder.findManager(props.manager.targetType).list
        watch(() => props.manager.list.length, getList, { immediate: true })

        function getList() {
            const uixx = props.manager.list.map((item) => item.ui)
            const set = new Set(uixx)
            list.value = source.filter((item) => set.has(item.ui))
        }

        function select() {
            const listModal = store.listModal
            listModal.showList(
                source,
                'Select ' + props.manager.targetType,
                function add(tag) {
                    try {
                        const one = props.manager.make(tag.ui)
                        props.manager.add(one)
                    } catch (error) {
                        Toast.error(error)
                    }
                },
            )
        }
        return { list, select }
    },
})

export default ReferenceList
</script>

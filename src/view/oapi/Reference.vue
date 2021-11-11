<template>
    <span @click="select" class="btn btn-outline-primary">
        {{ text ? text : reference.un ? reference.un : '+' }}
    </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import Reference from '@/model/OAPI/Reference'
import ss from '@/ss'
import store from '@/store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        reference: {
            type: Object as PropType<Reference>,
            required: true,
        },
        text: {
            type: String,
            required: false,
            default: '',
        },
        withBlank: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    setup(props, context) {
        function select() {
            const list = ss.project.finder.findManager(props.reference.type).list
            const title = 'Select ' + props.reference.type
            function callback(item: UniqueItem | null) {
                if (item === null) {
                    props.reference.ui = 0
                } else {
                    props.reference.ui = item.ui
                }
                context.emit('select')
            }
            if (props.withBlank) {
                store.listModal.showWithBlank(list, title, callback)
            } else {
                store.listModal.showList(list, title, callback)
            }
        }
        return { select }
    },
})
</script>

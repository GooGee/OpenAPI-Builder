<template>
    <span @click="select" class="btn btn-outline-primary">
        {{ text ? text : reference.ui ? getUN() : '+' }}
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
        function getUN() {
            const found = ss.project.finder.find(
                props.reference.ui,
                props.reference.type,
            )
            if (found === undefined) {
                return '??'
            } else {
                return found.un
            }
        }

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
        return { getUN, select }
    },
})
</script>

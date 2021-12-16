<template>
    <span @click="select" class="btn btn-outline-primary">
        {{ getUN() }}
    </span>
</template>

<script lang="ts">
import UniqueItemInterface from '@/model/Entity/UniqueItemInterface'
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
        withBlank: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(props, context) {
        function getUN() {
            if (props.reference.ui === 0) {
                return '+'
            }

            const found = ss.finder.find(props.reference)
            if (found === undefined) {
                return '??'
            }
            return found.un
        }

        function select() {
            const list = ss.finder.findManager(props.reference.type).list
            const title = 'Select ' + props.reference.type
            function callback(item: UniqueItemInterface | null) {
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

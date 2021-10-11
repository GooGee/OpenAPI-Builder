<template>
    <span @click="remove" class="btn btn-outline-danger"> - </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
    },
    setup(props, context) {
        function remove(event: Event) {
            event.stopPropagation()
            if (confirm('Are you sure?')) {
                props.manager.remove(props.item)
                context.emit('remove')
            }
        }
        return { remove }
    },
})
</script>

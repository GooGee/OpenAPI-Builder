<template>
    <span @click="change" class="btn btn-outline-primary">{{ text ?? item.un }}</span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManagerInterface from '@/model/Entity/UniqueItemManagerInterface'
import Toast from '@/model/Service/Toast'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
        manager: {
            type: Object as PropType<UniqueItemManagerInterface>,
            required: true,
        },
        text: {
            type: String,
            required: false,
            default: undefined,
        },
    },
    setup(props, context) {
        function change(event: Event) {
            event.stopPropagation()
            const text = prompt('Please input the name', props.item.un)
            if (text === null) {
                return
            }
            try {
                props.manager.changeUN(props.item, text)
            } catch (error) {
                Toast.error(error)
                return
            }
            context.emit('changed', text)
        }
        return { change }
    },
})
</script>

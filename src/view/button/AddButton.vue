<template>
    <span @click="add" class="btn btn-outline-primary"> + </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import Toast from '@/model/Helper/Toast'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
        value: {
            type: String,
            required: false,
            default: 'name',
        },
        noinput: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(props, context) {
        const add = () => {
            const text = prompt('Please input a name', props.value)
            if (text === null) {
                return
            }
            if (text === '') {
                return
            }
            if (props.manager.has(text)) {
                Toast.error(text + ' already exists')
                return
            }
            const item = props.manager.make(text)
            props.manager.add(item)
            context.emit('added', item)
        }
        return { add }
    },
})
</script>

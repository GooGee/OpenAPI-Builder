<template>
    <span @click="add" class="btn btn-outline-primary"> + </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import Toast from '@/model/Service/Toast'
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
        function add() {
            let name = props.value
            if (props.noinput) {
                //
            } else {
                const text = prompt('Please input the name', props.value)
                if (text === null) {
                    return
                }
                name = text
            }
            if (name === '') {
                return
            }
            if (props.manager.hasUN(name)) {
                Toast.error(name + ' already exists')
                return
            }
            const item = props.manager.make(name)
            props.manager.add(item)
            context.emit('added', item)
        }
        return { add }
    },
})
</script>

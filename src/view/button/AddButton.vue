<template>
    <span @click="add" class="btn btn-outline-primary"> + </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Base/UniqueItem'
import UniqueItemManager from '@/model/Base/UniqueItemManager'
import { defineComponent, inject, PropType, Ref } from 'vue'
import UIDialogue from '@/model/Dialogue/UIDialogue'

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
        const make = (value: string) => {
            const item = props.manager.make(value)
            props.manager.add(item)
            context.emit('added', item)
        }

        const uiDialogue = inject('uiDialogue') as Ref<UIDialogue>
        const add = () => {
            if (props.noinput) {
                make(props.value)
                return
            }
            uiDialogue.value.showInput('Please input the ui', props.value, (text: string) => {
                make(text)
            })
            uiDialogue.value.visible = true
        }
        return { add }
    },
})
</script>

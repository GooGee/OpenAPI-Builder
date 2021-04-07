<template>
    <span @click="change" class="btn btn-outline-primary"> {{ item.ui }} </span>
</template>

<script lang="ts">
import toast from '@/helper/toast'
import UniqueItem from '@/model/Base/UniqueItem'
import UniqueItemManager from '@/model/Base/UniqueItemManager'
import UIDialogue from '@/model/Dialogue/UIDialogue'
import { defineComponent, inject, PropType, Ref } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true,
        },
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
    },
    setup(props) {
        const uiDialogue = inject('uiDialogue') as Ref<UIDialogue>
        const change = () => {
            uiDialogue.value.showInput('Please input the ui', props.item.ui, (text: string) => {
                if (props.manager.find(text)) {
                    toast.error(text + ' already exists!')
                    return
                }
                props.item.ui = text
            })
            uiDialogue.value.visible = true
        }
        return { change }
    },
})
</script>

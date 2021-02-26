<template>
    <span @click="clone" class="btn btn-outline-primary"> Clone </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Base/UniqueItem'
import UniqueItemManager from '@/model/Base/UniqueItemManager'
import UIDialogue from '@/model/Dialogue/UIDialogue'
import { defineComponent, inject, PropType, Ref } from 'vue'

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
    setup(props) {
        const uiDialogue = inject('uiDialogue') as Ref<UIDialogue>
        const clone = () => {
            uiDialogue.value.showInput('Please input the ui', props.item.ui, (text: string) => {
                const one = props.manager.make(text)
                one.load(props.item)
                one.ui = text
                props.manager.add(one)
            })
            uiDialogue.value.visible = true
        }
        return { clone }
    },
})
</script>

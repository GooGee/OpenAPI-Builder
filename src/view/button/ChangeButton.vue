<template>
    <span @click="change" class="btn btn-outline-primary"> {{ item.ui }} </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Base/UniqueItem'
import { defineComponent, inject, PropType, Ref } from 'vue'
import UIDialogue from '@/model/Dialogue/UIDialogue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
    },
    setup(props) {
        const uiDialogue = inject('uiDialogue') as Ref<UIDialogue>
        const change = () => {
            uiDialogue.value.showInput('Please input the ui', props.item.ui, (text: string) => {
                props.item.ui = text
            })
            uiDialogue.value.visible = true
        }
        return { change }
    },
})
</script>

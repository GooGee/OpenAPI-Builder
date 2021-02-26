<template>
    <span @click="show" class="btn btn-outline-primary">
        <slot></slot>
    </span>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref } from 'vue'
import { ReferenceType } from '@/model/OAPI/Reference'
import UniqueItem from '@/model/Base/UniqueItem'
import sss from '@/sss.ts'
import ListDialogue from '@/model/Dialogue/ListDialogue'

export default defineComponent({
    props: {
        type: {
            type: String as PropType<ReferenceType>,
            required: false,
            default: ReferenceType.schemas,
        },
    },
    setup(props, context) {
        const listDialogue = inject('listDialogue') as Ref<ListDialogue>
        const show = () => {
            const manager = sss.getProject().oapi.getManager(props.type)
            listDialogue.value.showList(
                manager.list,
                'Select a ' + props.type,
                (selected: UniqueItem) => {
                    context.emit('select', selected)
                },
            )
            listDialogue.value.visible = true
        }
        return { show }
    },
})
</script>

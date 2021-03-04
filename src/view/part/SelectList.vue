<template>
    <span @click="show" class="btn btn-outline-primary">
        <slot></slot>
    </span>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref } from 'vue'
import UniqueItem from '@/model/Base/UniqueItem'
import ListDialogue from '@/model/Dialogue/ListDialogue'

export default defineComponent({
    props: {
        list: {
            type: Object as PropType<UniqueItem[]>,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        const listDialogue = inject('listDialogue') as Ref<ListDialogue>
        function show() {
            listDialogue.value.showList(props.list, props.title, (item: UniqueItem) => {
                context.emit('select', item)
                listDialogue.value.visible = false
            })
            listDialogue.value.visible = true
        }
        return { show }
    },
})
</script>

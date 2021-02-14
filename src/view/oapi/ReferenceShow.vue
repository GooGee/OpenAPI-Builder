<template>
    <span @click="show" class="btn btn-outline-primary">
        <slot></slot>
    </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReferenceType } from '@/model/OAPI/Reference'
import UniqueItem from '@/model/Base/UniqueItem'
import sss from '@/sss.ts'

export default defineComponent({
    props: {
        type: {
            type: String as PropType<ReferenceType>,
            required: false,
            default: ReferenceType.schemas,
        },
    },
    methods: {
        show() {
            const manager = sss.getProject().oapi.getManager(this.type)
            sss.listDialogue.showList(
                manager.list,
                'Select a ' + this.type,
                (selected: UniqueItem) => {
                    this.$emit('select', selected)
                },
            )
        },
    },
})
</script>

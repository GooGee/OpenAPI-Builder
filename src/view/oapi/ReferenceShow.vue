<template>
    <SelectList v-bind="$attrs" :list="list" :title="title">
        <slot></slot>
    </SelectList>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref } from 'vue'
import { ReferenceType } from '@/model/OAPI/Reference'
import UniqueItem from '@/model/Base/UniqueItem'
import sss from '@/sss.ts'
import ListDialogue from '@/model/Dialogue/ListDialogue'
import SelectList from '../part/SelectList.vue'

export default defineComponent({
    components: {
        SelectList,
    },
    props: {
        type: {
            type: String as PropType<ReferenceType>,
            required: false,
            default: ReferenceType.schemas,
        },
    },
    data() {
        return {
            list: sss.getProject().oapi.getManager(this.type).list,
            title: 'Select a ' + this.type,
        }
    },
})
</script>

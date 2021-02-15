<template>
    <ReferenceShow @select="select" :type="reference.type">
        {{ reference.ui ? reference.ui : '+' }}
    </ReferenceShow>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Reference from '@/model/OAPI/Reference'
import UniqueItem from '@/model/Base/UniqueItem'
import sss from '@/sss.ts'
import ReferenceShow from './ReferenceShow.vue'

export default defineComponent({
    components: {
        ReferenceShow,
    },
    props: {
        reference: {
            type: Object as PropType<Reference>,
            required: true,
        },
    },
    methods: {
        select(selected: UniqueItem) {
            this.reference.ui = selected.ui
        },
    },
})
</script>

<template>
    <ED :item="item"></ED>
</template>

<script lang="ts">
import ss from '@/ss'
import { defineComponent } from 'vue'
import ED from '../oapi/External.vue'

export default defineComponent({
    components: {
        ED,
    },
    setup(props, context) {
        const item = ss.project.oapi.externalDocs
        return { item }
    },
})
</script>

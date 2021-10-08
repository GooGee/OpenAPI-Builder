<template>
    <External :item="item"></External>
</template>

<script lang="ts">
import ss from '@/ss'
import { defineComponent } from 'vue'
import External from '../oapi/External.vue'

export default defineComponent({
    components: {
        External,
    },
    setup(props, context) {
        const item = ss.project.oapi.externalDocs
        return { item }
    },
})
</script>

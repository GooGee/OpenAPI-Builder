<template>
    <ED :item="sss.project.oapi.externalDocs"></ED>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ED from '../oapi/External.vue'

export default defineComponent({
    components: {
        ED,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

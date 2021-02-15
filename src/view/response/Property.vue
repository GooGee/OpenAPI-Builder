<template>
    <PropertyTable></PropertyTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import PropertyTable from '../oapi/PropertyTable.vue'

export default defineComponent({
    components: {
        PropertyTable,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

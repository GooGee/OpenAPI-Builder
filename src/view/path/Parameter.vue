<template>
    <ReferenceList :manager="sss.sidebar.item.parameterManager" type="parameters"></ReferenceList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ReferenceList from '../oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        ReferenceList,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

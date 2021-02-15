<template>
    <MediaTypeList :manager="sss.sidebar.item.mediaTypeManager"></MediaTypeList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import MediaTypeList from '../oapi/MediaTypeList.vue'

export default defineComponent({
    components: {
        MediaTypeList,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

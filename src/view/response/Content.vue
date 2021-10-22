<template>
    <MediaTypeList :manager="sidebar.item.mediaTypeManager"></MediaTypeList>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, inject } from 'vue'
import MediaTypeList from '../oapi/MediaTypeList.vue'

export default defineComponent({
    components: {
        MediaTypeList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar
        return { sidebar }
    },
})
</script>

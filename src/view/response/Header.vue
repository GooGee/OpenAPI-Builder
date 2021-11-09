<template>
    <ReferenceList :manager="sidebar.item.headerManager" class="mt11"></ReferenceList>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, inject } from 'vue'
import ReferenceList from '../oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        ReferenceList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar
        return { sidebar }
    },
})
</script>

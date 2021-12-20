<template>
    <CheckList
        v-if="sidebar.item.isComposition"
        :fieldxx="fieldxx"
        :manager="manager"
        title="excluded"
    ></CheckList>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import Schema from '@/model/OAPI/Schema'
import ss from '@/ss'
import { computed, defineComponent, inject } from 'vue'
import CheckList from '../part/CheckList.vue'

export default defineComponent({
    components: {
        CheckList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<Schema>
        const manager = computed(() => sidebar.item!.excludedManager)
        const fieldxx = computed(() => ss.finder.getSchemaFieldList(sidebar.item!))
        return { fieldxx, manager, sidebar }
    },
})
</script>

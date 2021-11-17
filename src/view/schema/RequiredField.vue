<template>
    <CheckList
        v-if="sidebar.item.isComposition"
        :fieldxx="fieldxx"
        :manager="manager"
        title="required"
    ></CheckList>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import ss from '@/ss'
import { computed, defineComponent, inject } from 'vue'
import CheckList from '../part/CheckList.vue'

export default defineComponent({
    components: {
        CheckList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<SchemaComplex>
        const manager = computed(() => sidebar.item!.requiredManager)
        const fieldxx = computed(() =>
            ss.project.finder.getSchemaFieldList(sidebar.item!),
        )
        return { fieldxx, manager, sidebar }
    },
})
</script>

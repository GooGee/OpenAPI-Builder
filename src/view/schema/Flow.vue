<template>
    <div class="mtb11"></div>
    <ReferenceList :manager="sidebar.item.flowManager">
        <span @click="run" class="btn btn-outline-primary"> run </span>
    </ReferenceList>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import RunFlow from '@/model/Service/RunFlow'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { defineComponent, inject } from 'vue'
import ReferenceList from '../oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        ReferenceList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<SchemaComplex>

        function run() {
            try {
                RunFlow(sidebar.item!, ss)
            } catch (error) {
                Toast.error(error.message)
            }
        }
        return { run, sidebar }
    },
})
</script>

<template>
    <div class="mtb11"></div>
    <span @click="run" class="btn btn-outline-primary mb11"> run </span>
    <br />
    <ReferenceList :manager="sidebar.item.flowManager"></ReferenceList>
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
                Toast.success('ok')
            } catch (error) {
                Toast.error(error)
            }
        }
        return { run, sidebar }
    },
})
</script>

<template>
    <div class="mtb11"></div>
    <span @click="run" class="btn btn-outline-primary mb11"> run </span>
    <br />
    <ReferenceList :manager="sidebar.item.flowManager"></ReferenceList>
</template>

<script lang="ts">
import emitter from '@/emitter'
import { EventEnum } from '@/model/Entity/Event'
import SideBar from '@/model/Entity/SideBar'
import Schema from '@/model/OAPI/Schema'
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
        const sidebar = inject('sidebar') as SideBar<Schema>

        function run() {
            try {
                RunFlow(sidebar.item!, ss)
                emitter.emit(EventEnum['sidebar-list-change'])
                Toast.success('ok')
            } catch (error) {
                Toast.error(error)
            }
        }
        return { run, sidebar }
    },
})
</script>

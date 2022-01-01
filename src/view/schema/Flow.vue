<template>
    <CheckList
        @select="select"
        :manager="sidebar.item!.flowManager"
        :optionxx="optionxx"
        title="include"
    >
        <span @click="run" class="btn btn-outline-primary ml11"> make all included </span>
    </CheckList>
    <Diagram :path="selected" :schema="sidebar.item!"></Diagram>
</template>

<script lang="ts">
import emitter from '@/emitter'
import { EventEnum } from '@/model/Entity/Event'
import LayerPath from '@/model/Entity/LayerPath'
import SideBar from '@/model/Entity/SideBar'
import Schema from '@/model/OAPI/Schema'
import MakeFlow from '@/model/Service/MakeFlow'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { defineComponent, inject, ref } from 'vue'
import CheckList from '../part/CheckList.vue'
import Diagram from './Diagram.vue'

export default defineComponent({
    components: {
        CheckList,
        Diagram,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<Schema>

        const optionxx = ss.project.flowManager.list
        const selected = ref(optionxx[0])

        function run() {
            try {
                MakeFlow(sidebar.item!, ss)
                emitter.emit(EventEnum['sidebar-list-change'])
                Toast.success('ok')
            } catch (error) {
                Toast.error(error)
            }
        }

        function select(item: LayerPath) {
            selected.value = item
        }
        return {
            optionxx,
            run,
            select,
            selected,
            sidebar,
        }
    },
})
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th colspan="2">
                    <ColorPanel v-model:color="color"></ColorPanel>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.un">
                <td>
                    <RunButton
                        :schema="sidebar.item"
                        :script="item"
                        @run="run"
                    ></RunButton>
                    <span class="ml11">{{ item.un }}</span>
                </td>
                <td>{{ item.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import emitter from '@/emitter'
import { EventEnum } from '@/model/Entity/Event'
import Script from '@/model/Entity/Script'
import SideBar from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, inject, ref, watch } from 'vue'
import RunButton from '../button/RunButton.vue'
import ColorPanel from '../part/ColorPanel.vue'

export default defineComponent({
    components: {
        ColorPanel,
        RunButton,
    },
    setup(props, context) {
        const color = ref('')
        let list = ref<Script[]>([])
        function filter() {
            list.value = ss.project.scriptManager.list.filter((item) => {
                if (item.global) {
                    return false
                }
                if (item.single) {
                    return false
                }
                if (color.value === '') {
                    return true
                }
                return item.color === color.value
            })
        }
        filter()
        watch([color], filter)

        function run() {
            emitter.emit(EventEnum['sidebar-list-change'])
        }
        const sidebar = inject('sidebar') as SideBar
        return {
            color,
            list,
            run,
            sidebar,
        }
    },
})
</script>

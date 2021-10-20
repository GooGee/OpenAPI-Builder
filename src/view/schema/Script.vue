<template>
    <table class="table">
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
import SideBar from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, inject } from 'vue'
import RunButton from '../button/RunButton.vue'

export default defineComponent({
    components: {
        RunButton,
    },
    setup(props, context) {
        const list = ss.project.scriptManager.list.filter((item) => {
            if (item.global) {
                return false
            }
            if (item.single) {
                return false
            }
            return true
        })

        function run() {
            emitter.emit(EventEnum['sidebar-list-change'])
        }
        const sidebar = inject('sidebar') as SideBar
        return { list, run, sidebar }
    },
})
</script>

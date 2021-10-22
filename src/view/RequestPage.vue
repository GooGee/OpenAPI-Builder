<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <TabBar path="/request" class="mt11"></TabBar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, provide, reactive } from 'vue'
import SideBar from './part/SideBar.vue'
import TabBar from './part/TabBar.vue'

export default defineComponent({
    components: {
        SideBar,
        TabBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Request))
        provide('sidebar', sidebar)
        return { sidebar }
    },
})
</script>

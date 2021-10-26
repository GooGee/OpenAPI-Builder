<template>
    <div class="row">
        <div class="col-4">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-8">
            <Script :sidebar="sidebar"></Script>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import SideBar from './part/SideBar.vue'
import Script from './table/Script.vue'

export default defineComponent({
    components: {
        Script,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Script))
        return { sidebar }
    },
})
</script>

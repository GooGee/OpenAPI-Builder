<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div class="col-9">
            <Preset :sidebar="sidebar"></Preset>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import SideBar from './part/SideBar.vue'
import Preset from './table/Preset.vue'

export default defineComponent({
    components: {
        Preset,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Preset))
        return { sidebar }
    },
})
</script>

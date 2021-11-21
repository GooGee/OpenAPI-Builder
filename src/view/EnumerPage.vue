<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <Enumer :item="sidebar.item"></Enumer>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import Enumer from './oapi/Enumer.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        Enumer,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Enumer))
        return { sidebar }
    },
})
</script>

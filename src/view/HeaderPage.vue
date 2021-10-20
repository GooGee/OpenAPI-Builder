<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <Parameter :sidebar="sidebar" :isHeader="true"></Parameter>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import Parameter from './oapi/Parameter.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        Parameter,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Header))
        return { sidebar }
    },
})
</script>

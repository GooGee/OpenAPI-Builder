<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <Template :sidebar="sidebar"></Template>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import SideBar from './part/SideBar.vue'
import Template from './table/Template.vue'

export default defineComponent({
    components: {
        SideBar,
        Template,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Template))
        return { sidebar }
    },
})
</script>

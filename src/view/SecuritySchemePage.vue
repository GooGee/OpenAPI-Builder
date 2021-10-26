<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <SecurityScheme :item="sidebar.item"></SecurityScheme>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import SideBar from './part/SideBar.vue'
import SecurityScheme from './security/SecurityScheme.vue'

export default defineComponent({
    components: {
        SecurityScheme,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.SecurityScheme))
        return { sidebar }
    },
})
</script>

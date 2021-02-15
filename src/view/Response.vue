<template>
    <div class="row">
        <div class="col-3">
            <SideBar></SideBar>
        </div>

        <div class="col-9">
            <h1></h1>
            <TabBar :route="route"></TabBar>
            <router-view v-if="sss.sidebar.item"></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabBar from './part/TabBar.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        TabBar,
        SideBar,
    },
    data() {
        return {
            sss,
            route: this.$router.options.routes.find(route => route.name === 'response'),
        }
    },
    created() {
        sss.show(SideBarEnum.Response)
    },
})
</script>

<template>
    <div class="row">
        <SideBar :manager="manager" title="Server" name="url" class="col-4"></SideBar>

        <div v-if="ready && sidebar.item" class="col-8">
            <Server :server="sidebar.item" :manager="manager" :key="sidebar.item.url"></Server>
        </div>
    </div>
</template>

<script>
import AddButton from './button/AddButton.vue'
import SideBar from './SideBar.vue'
import Server from './specification/Server.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'ServerList',
    components: {
        AddButton,
        Server,
        SideBar,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.serverManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

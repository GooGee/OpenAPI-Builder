<template>
    <div class="row">
        <SideBar :manager="manager" title="Header" class="col-3"></SideBar>

        <div v-if="ready && sidebar.item" class="col-9">
            <Header :item="sidebar.item" :manager="manager"></Header>
        </div>
    </div>
</template>

<script>
import Header from './specification/Header.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'HeaderPage',
    components: {
        Header,
        SideBar,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.component.headerManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

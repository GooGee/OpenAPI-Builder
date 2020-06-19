<template>
    <div class="row">
        <SideBar :manager="manager" title="Header" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <Header v-if="sidebar.item" :item="sidebar.item" :manager="manager"></Header>

            <Script v-else :manager="manager" name="scriptHeader" class="mtb11"></Script>
        </div>
    </div>
</template>

<script>
import Header from './specification/Header.vue'
import SideBar from './SideBar.vue'
import Script from './Script.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'HeaderPage',
    components: {
        Header,
        SideBar,
        Script,
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

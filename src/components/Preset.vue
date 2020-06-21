<template>
    <div class="row">
        <SideBar :manager="manager" title="Preset" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <PropertyList v-if="sidebar.item" :manager="sidebar.item.propertyManager"></PropertyList>
        </div>
    </div>
</template>

<script>
import SideBar from './SideBar.vue'
import PropertyList from './PropertyList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Preset',
    components: {
        SideBar,
        PropertyList,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.presetManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

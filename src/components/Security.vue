<template>
    <div class="row">
        <SideBar :manager="manager" title="SecurityScheme" class="col-3"></SideBar>

        <div v-if="ready && sidebar.item" class="col-9">
            <SecurityScheme :item="sidebar.item" :manager="manager"></SecurityScheme>
        </div>
    </div>
</template>

<script>
import SideBar from './SideBar.vue'
import SecurityScheme from './specification/SecurityScheme.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Security',
    components: {
        SideBar,
        SecurityScheme,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.component.securitySchemeManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

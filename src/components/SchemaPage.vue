<template>
    <div class="row">
        <SideBar :manager="manager" title="Schema" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <table v-if="sidebar.item" class="table">
                <tbody>
                    <Schema :schema="sidebar.item" :manager="manager"></Schema>
                </tbody>
            </table>

            <Script v-else :manager="manager" name="scriptSchema" item="Schema" class="mtb11"></Script>
        </div>
    </div>
</template>

<script>
import SideBar from './SideBar.vue'
import Script from './Script.vue'
import Schema from './specification/Schema.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'SchemaPage',
    components: {
        SideBar,
        Schema,
        Script,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.component.schemaManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

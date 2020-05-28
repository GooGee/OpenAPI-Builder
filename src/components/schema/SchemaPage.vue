<template>
    <div class="row">
        <SideBar :manager="manager" title="Schema" class="col-3"></SideBar>

        <div v-if="ready && sidebar.item" class="col-9">
            <table class="table">
                <tbody>
                    <Schema :schema="sidebar.item" :manager="manager"></Schema>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SideBar from '../SideBar.vue'
import Schema from './Schema.vue'
import builder from '../../states/builder.js'
import sidebar from '../../states/sidebar.js'

export default {
    name: 'SchemaPage',
    components: {
        SideBar,
        Schema,
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

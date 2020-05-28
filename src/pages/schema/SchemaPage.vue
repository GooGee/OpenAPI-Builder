<template>
    <div class="row">
        <SideBar :manager="manager" title="Schema" class="col-3"></SideBar>

        <div class="col-9">
            <table v-if="sidebar.item" class="table b-table">
                <tbody>
                    <Schema :schema="sidebar.item" :manager="manager"></Schema>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SideBar from '../../components/SideBar.vue'
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
            manager: builder.document.component.schemaManager,
        }
    },
}
</script>

<template>
    <div class="row">
        <SideBar :manager="manager" title="Schema" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <table v-if="sidebar.item" class="table">
                <tbody>
                    <Schema :schema="sidebar.item" :manager="manager"></Schema>
                    <tr>
                        <td class="text-right">With</td>
                        <td>
                            <ItemManager :manager="sidebar.item.operationManager" :list="list"></ItemManager>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">example</td>
                        <td>
                            <textarea
                                v-model="sidebar.item.example"
                                class="form-control"
                                spellcheck="false"
                                rows="11"
                            ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Script v-else :manager="manager" name="scriptSchema" item="Schema" class="mtb11"></Script>
        </div>
    </div>
</template>

<script>
import ItemManager from './ItemManager.vue'
import SideBar from './SideBar.vue'
import Script from './Script.vue'
import Schema from './specification/Schema.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'SchemaPage',
    components: {
        ItemManager,
        SideBar,
        Schema,
        Script,
    },
    data() {
        return {
            sidebar,
            ready: false,
            type: '',
            list: builder.presetManager.find('SchemaWithOperation').propertyManager.list,
            manager: builder.document.component.schemaManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

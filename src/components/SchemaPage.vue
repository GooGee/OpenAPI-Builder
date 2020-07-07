<template>
    <div class="row">
        <SideBar :manager="manager" title="Schema" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <table v-if="sidebar.item" class="table">
                <tbody>
                    <Schema :schema="sidebar.item" :manager="manager"></Schema>
                    <tr>
                        <td class="text-right">with</td>
                        <td>
                            <div>
                                <SelectButton
                                    :manager="sidebar.item.operationManager"
                                    :list="list"
                                    name="name"
                                    text="name"
                                    class="mr11"
                                ></SelectButton>
                                <b-button @click="all" variant="outline-primary"> All </b-button>
                            </div>
                            <EditList
                                :manager="sidebar.item.operationManager"
                                :withadd="false"
                                :withedit="false"
                            ></EditList>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">example</td>
                        <td>
                            <b-form-checkbox v-model="visible" name="check-button" size="lg" switch></b-form-checkbox>
                            <textarea
                                v-if="visible"
                                v-model="sidebar.item.example"
                                class="form-control mtb11"
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
import DeleteButton from './button/DeleteButton.vue'
import SelectButton from './button/SelectButton.vue'
import EditList from './EditList.vue'
import SideBar from './SideBar.vue'
import Script from './Script.vue'
import Schema from './specification/Schema.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'SchemaPage',
    components: {
        DeleteButton,
        SelectButton,
        EditList,
        SideBar,
        Schema,
        Script,
    },
    data() {
        return {
            sidebar,
            ready: false,
            visible: false,
            list: builder.presetManager.find('SchemaWithOperation').propertyManager.list,
            manager: builder.document.component.schemaManager,
        }
    },
    mounted() {
        this.ready = true
    },
    methods: {
        all() {
            this.list.forEach(one => {
                const item = sidebar.item.operationManager.make(one.name)
                if (sidebar.item.operationManager.find(one.name)) {
                    return
                }
                sidebar.item.operationManager.add(item)
            })
        },
    },
}
</script>

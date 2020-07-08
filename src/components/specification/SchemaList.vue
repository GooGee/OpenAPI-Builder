<template>
    <table class="table">
        <tbody>
            <Schema
                v-for="schema in manager.list"
                :schema="schema"
                :manager="manager"
                :type="type"
                :inComposition="inComposition"
                :done="editing"
                :key="schema.name"
            ></Schema>
        </tbody>
        <tfoot v-if="editing">
            <tr>
                <td>
                    <b-button-group v-if="type === 'object'">
                        <AddButton :manager="manager" name="name"></AddButton>
                        <ImportButton :manager="manager"></ImportButton>
                    </b-button-group>
                    <AddButton v-else :manager="manager" name=""></AddButton>
                </td>
                <td>
                    <template v-if="type === 'object'">
                        <SelectButton
                            :manager="manager"
                            :list="list"
                            :callback="add"
                            name="name"
                            text="name"
                            class="mr11"
                        ></SelectButton>
                        <b-form-select @change="addId" :options="schemaxx" class="wa"></b-form-select>
                    </template>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import builder from '../../states/builder.js'
import AddButton from '../button/AddButton.vue'
import ImportButton from '../button/ImportButton.vue'
import SelectButton from '../button/SelectButton.vue'

export default {
    name: 'SchemaList',
    components: {
        AddButton,
        ImportButton,
        SelectButton,
    },
    beforeCreate() {
        this.$options.components.Schema = require('./Schema').default
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        editing: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: 'object',
        },
        inComposition: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            list: builder.presetManager.find('CommonName').propertyManager.list,
        }
    },
    computed: {
        schemaxx() {
            return builder.document.component.schemaManager.list.map(schema => {
                return schema.name + '_id'
            })
        },
    },
    methods: {
        add(schema, manager) {
            const item = manager.make(schema.name)
            item.type = schema.tag
            item.load(schema.data)
            manager.add(item)
        },
        addId(name) {
            const item = this.manager.make(name)
            item.type = 'number'
            this.manager.add(item)
        },
    },
}
</script>

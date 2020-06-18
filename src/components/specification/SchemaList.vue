<template>
    <table class="table">
        <tbody>
            <Schema
                v-for="schema in manager.list"
                :schema="schema"
                :manager="manager"
                :type="type"
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
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import ImportButton from '../button/ImportButton.vue'
import dialogue from '../../states/dialogue.js'

export default {
    name: 'SchemaList',
    components: {
        AddButton,
        ImportButton,
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
    },
}
</script>

<template>
    <table class="table">
        <tbody>
            <Schema v-for="schema in manager.list" :schema="schema" :manager="manager" :key="schema.name"></Schema>
        </tbody>
        <tfoot v-if="editing">
            <tr>
                <td>
                    <AddButton :manager="manager" name="name"></AddButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '../../components/AddButton.vue'

export default {
    name: 'SchemaList',
    components: { AddButton },
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
    },
}
</script>

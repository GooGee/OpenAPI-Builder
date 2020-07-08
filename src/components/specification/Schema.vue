<template>
    <tr>
        <td v-if="editing" class="schema-name">
            <b-button @click="editing = false" variant="outline-primary" class="mr11"> OK </b-button>
            <b-button-group>
                <DeleteButton :manager="manager" :item="schema"></DeleteButton>
                <ChangeButton v-if="type === 'object'" :item="schema" name="name"></ChangeButton>
            </b-button-group>
            <b-form-checkbox v-model="schema.required" :value="true" :unchecked-value="false" class="mtb11">required</b-form-checkbox>
        </td>
        <td v-else @click="editing = true" class="schema-name text-right">
            <span v-if="type === 'object'">{{ schema.name }}</span>
        </td>

        <td @click="editing = true">
            <SchemaType :schema="schema" :editing="editing" :inComposition="inComposition"></SchemaType>
        </td>
    </tr>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SchemaType from './SchemaType.vue'

export default {
    name: 'Schema',
    components: {
        ChangeButton,
        DeleteButton,
        SchemaType,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        schema: {
            type: Object,
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
        done: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            editing: false,
        }
    },
    watch: {
        done() {
            this.editing = false
        },
    },
}
</script>

<style>
.schema-name {
    width: 1%;
    white-space: nowrap;
}
</style>

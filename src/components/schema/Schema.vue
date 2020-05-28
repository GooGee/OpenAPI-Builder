<template>
    <tr>
        <td v-if="editing" class="schema-name">
            <b-button @click="editing = false" variant="outline-primary" class="mr11px"> OK </b-button>
            <b-button-group>
                <DeleteButton :manager="manager" :item="schema"></DeleteButton>
                <ChangeButton :item="schema" name="name"></ChangeButton>
            </b-button-group>
        </td>
        <td v-else @click="editing = true" class="schema-name">{{ schema.name }}</td>

        <td @click="editing = true">
            <SchemaType :schema="schema" :editing="editing"></SchemaType>
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
    },
    data() {
        return {
            editing: false,
        }
    },
}
</script>

<style>
.schema-name {
    width: 1%;
    white-space: nowrap;
}
</style>

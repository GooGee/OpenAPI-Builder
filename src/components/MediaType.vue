<template>
    <table class="table">
        <tbody>
            <tr>
                <td width="111px"></td>
                <td>
                    <DeleteButton :manager="manager" :item="item">{{ item.name }}</DeleteButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">
                    schema
                    <b-button v-if="editing" @click="editing = false" variant="outline-primary"> OK </b-button>
                </td>
                <td @click="editing = true">
                    <SchemaType :schema="item.schema" :editing="editing"></SchemaType>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import DeleteButton from './DeleteButton.vue'
import SchemaType from './schema/SchemaType.vue'

export default {
    name: 'MediaType',
    components: {
        DeleteButton,
        SchemaType,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
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

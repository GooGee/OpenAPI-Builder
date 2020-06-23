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
            <tr>
                <td>examples</td>
                <td>
                    <ReferenceList :manager="item.exampleManager" type="examples"></ReferenceList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import DeleteButton from '../button/DeleteButton.vue'
import ReferenceList from './ReferenceList.vue'
import SchemaType from './SchemaType.vue'

export default {
    name: 'MediaType',
    components: {
        DeleteButton,
        ReferenceList,
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

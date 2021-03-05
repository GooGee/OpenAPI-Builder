<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">ui</td>
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.ui }} </span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="text-right">schema</td>
                <td>
                    <SchemaSimple :schema="item.schema"></SchemaSimple>
                </td>
            </tr>
            <tr>
                <td class="text-right">examples</td>
                <td>
                    <ReferenceList :manager="item.exampleManager" type="examples"></ReferenceList>
                </td>
            </tr>
            <tr>
                <td class="text-right">example</td>
                <td>
                    <textarea
                        v-model="item.example"
                        class="form-control"
                        spellcheck="false"
                        rows="3"
                    ></textarea>
                </td>
            </tr>
            <tr>
                <td class="text-right">encoding</td>
                <td>
                    <EncodingList :manager="item.encodingManager"></EncodingList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import EncodingList from './EncodingList.vue'
import ReferenceList from './ReferenceList.vue'
import SchemaSimple from '../schema/SchemaSimple.vue'

export default defineComponent({
    components: {
        DeleteButton,
        EncodingList,
        ReferenceList,
        SchemaSimple,
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
})
</script>

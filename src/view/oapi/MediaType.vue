<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">un</td>
                <td>
                    <slot></slot>
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
                    <ReferenceList
                        :manager="item.exampleManager"
                        type="examples"
                    ></ReferenceList>
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
import MediaType from '@/model/OAPI/MediaType'
import { defineComponent, PropType } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import SchemaSimple from '../schema/SchemaSimple.vue'
import EncodingList from './EncodingList.vue'
import ReferenceList from './ReferenceList.vue'

export default defineComponent({
    components: {
        DeleteButton,
        EncodingList,
        ReferenceList,
        SchemaSimple,
    },
    props: {
        item: {
            type: Object as PropType<MediaType>,
            required: true,
        },
    },
})
</script>

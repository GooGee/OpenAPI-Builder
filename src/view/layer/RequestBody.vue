<template>
    <table class="table">
        <caption class="caption-top">
            <h2 class="inline mr11">RequestBody</h2>
            <slot></slot>
        </caption>
        <tbody v-if="withRequestBody">
            <tr>
                <td class="text-right w111">unPattern</td>
                <td>
                    <input type="text" class="form-control" v-model="item.unPattern" />
                </td>
            </tr>
            <tr>
                <td class="text-right">schema</td>
                <td>
                    <Schema :schema="item.schema"></Schema>
                </td>
            </tr>
            <tr>
                <td class="text-right">MediaType</td>
                <td>
                    <MediaType :manager="item.mtManager"></MediaType>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import LayerRequestBody from '@/model/Entity/LayerRequestBody'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import EditList from '../part/EditList.vue'
import MediaType from './MediaType.vue'
import Schema from './Schema.vue'
import Status from './Status.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        EditList,
        MediaType,
        Schema,
        Status,
    },
    props: {
        item: {
            type: Object as PropType<LayerRequestBody>,
            required: true,
        },
        withRequestBody: {
            type: Boolean,
            required: true,
        },
    },
})
</script>

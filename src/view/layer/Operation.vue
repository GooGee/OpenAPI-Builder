<template>
    <table class="table">
        <caption class="caption-top">
            <h2 class="inline mr11">Operation</h2>
            <select v-model="path.operation.un" class="form-control inline wa">
                <option v-for="item in optionxx" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>
        </caption>
        <tbody>
            <tr>
                <td class="text-right w111">parameter</td>
                <td>
                    <EditList :manager="path.operation.parameterManager"></EditList>
                </td>
            </tr>
            <tr>
                <td class="text-right">tag</td>
                <td>
                    <EditList
                        :manager="path.operation.tagManager"
                        value="${schema.un}"
                    ></EditList>
                </td>
            </tr>
        </tbody>
    </table>

    <RequestBody
        :item="path.operation.requestBody"
        :withRequestBody="path.operation.withRequestBody"
    >
        <span class="custom-control custom-switch inline">
            <input
                id="withRequestBody"
                v-model="path.operation.withRequestBody"
                type="checkbox"
                class="custom-control-input"
            />
            <label for="withRequestBody" class="custom-control-label"></label>
        </span>
    </RequestBody>

    <Status :operation="path.operation" :path="path"></Status>

    <Security
        :item="path.operation.security"
        :withSecurity="path.operation.withSecurity"
    >
        <span class="custom-control custom-switch inline">
            <input
                id="withSecurity"
                v-model="path.operation.withSecurity"
                type="checkbox"
                class="custom-control-input"
            />
            <label for="withSecurity" class="custom-control-label"></label> </span
    ></Security>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
import { optionxx } from '@/model/OAPI/Operation'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import EditList from '../part/EditList.vue'
import MediaType from './MediaType.vue'
import RequestBody from './RequestBody.vue'
import Schema from './Schema.vue'
import Security from './Security.vue'
import Status from './Status.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        EditList,
        MediaType,
        RequestBody,
        Schema,
        Security,
        Status,
    },
    props: {
        path: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
    },
    setup(props, context) {
        return {
            optionxx,
        }
    },
})
</script>

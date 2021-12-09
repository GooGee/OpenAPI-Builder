<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Operation</h2>
        </caption>
        <thead>
            <tr>
                <th colspan="2">
                    <ButtonGroup
                        v-model:option="option"
                        :list="optionxx"
                        :manager="path.operationManager"
                    ></ButtonGroup>
                </th>
            </tr>
            <tr>
                <th colspan="2">
                    <h2 class="inline mr11">{{ option }}</h2>
                    <AddButton
                        v-if="operation === null"
                        :manager="path.operationManager"
                        :value="option"
                        :noinput="true"
                    ></AddButton>
                    <DeleteButton
                        v-else
                        :item="operation"
                        :manager="path.operationManager"
                    ></DeleteButton>
                </th>
            </tr>
        </thead>
        <tbody v-if="operation">
            <tr>
                <td class="text-right w111">parameter</td>
                <td>
                    <EditList :manager="operation.parameterManager"></EditList>
                </td>
            </tr>
            <tr>
                <td class="text-right">tag</td>
                <td>
                    <EditList
                        :manager="operation.tagManager"
                        value="${schema.un}"
                    ></EditList>
                </td>
            </tr>
        </tbody>
    </table>

    <RequestBody v-if="operation" :item="operation.requestBody"></RequestBody>

    <Status v-if="operation" :operation="operation" :path="path"></Status>

    <Security v-if="operation" :item="operation.security"></Security>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
import { computed, defineComponent, PropType, ref } from 'vue'
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
        const optionxx = [
            'get',
            'delete',
            'head',
            'options',
            'patch',
            'post',
            'put',
            'trace',
        ]
        const option = ref(optionxx[0])

        const operation = computed(function () {
            return props.path.operationManager.findByUN(option.value) ?? null
        })

        return {
            operation,
            option,
            optionxx,
        }
    },
})
</script>

<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Operation</h2>
        </caption>
        <tbody>
            <tr>
                <td>
                    <ButtonGroup
                        v-model:option="option"
                        :list="optionxx"
                        :manager="path.operationManager"
                    ></ButtonGroup>
                </td>
            </tr>
            <tr>
                <td>
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
                </td>
            </tr>
        </tbody>
    </table>

    <table v-if="operation" class="table">
        <caption class="caption-top">
            <h2>RequestBody</h2>
        </caption>
        <tbody>
            <tr>
                <td class="text-right w111">unPattern</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="operation.requestBody.unPattern"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right"></td>
                <td>
                    <MediaType :manager="operation.requestBody.mtManager"></MediaType>
                </td>
            </tr>
        </tbody>
    </table>

    <Status v-if="operation" :operation="operation" :path="path"></Status>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
import { computed, defineComponent, PropType, ref } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import MediaType from './MediaType.vue'
import Status from './Status.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        MediaType,
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

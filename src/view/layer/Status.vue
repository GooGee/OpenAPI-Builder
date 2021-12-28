<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Response</h2>
        </caption>
        <thead>
            <tr>
                <td class="text-right w111">status</td>
                <td>response</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in operation.statusManager.list" :key="item.ui">
                <td class="text-right">
                    <div class="btn-group">
                        <DeleteButton
                            :item="item"
                            :manager="operation.statusManager"
                        ></DeleteButton>
                        <ChangeButton
                            :item="item"
                            :manager="operation.statusManager"
                        ></ChangeButton>
                    </div>
                </td>
                <td>
                    <div>
                        <label class="mr11">
                            <input
                                v-model="item.useExisted"
                                :value="true"
                                type="radio"
                            />
                            existed
                        </label>
                        <label>
                            <input
                                v-model="item.useExisted"
                                :value="false"
                                type="radio"
                            />
                            new
                        </label>
                    </div>
                    <Reference
                        v-if="item.useExisted"
                        :reference="item.reference"
                    ></Reference>
                    <table v-else class="table">
                        <tbody>
                            <tr>
                                <td class="text-right w111">unPattern</td>
                                <td>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="item.unPattern"
                                    />
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
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="text-right">
                    <SelectButton
                        @select="select"
                        :list="codexx"
                        :manager="operation.statusManager"
                    ></SelectButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import LayerOperation from '@/model/Entity/LayerOperation'
import LayerPath from '@/model/Entity/LayerPath'
import LayerResponse from '@/model/Entity/LayerResponse'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'
import Reference from '../oapi/Reference.vue'
import MediaType from './MediaType.vue'
import Schema from './Schema.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        MediaType,
        Reference,
        Schema,
        SelectButton,
    },
    props: {
        operation: {
            type: Object as PropType<LayerOperation>,
            required: true,
        },
        path: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
    },
    setup(props, context) {
        function select(old: LayerResponse, item: LayerResponse) {
            item.schema.unPattern =
                '${schema.un}_Response_${operation.un + path.suffix}'
        }
        return {
            codexx: ss.project.getPreset('HttpStatus')!.propertyManager.list,
            select,
        }
    },
})
</script>

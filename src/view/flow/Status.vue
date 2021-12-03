<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Response</h2>
        </caption>
        <thead>
            <tr>
                <td class="text-right w111">status</td>
                <td>unPattern</td>
                <td>MediaType</td>
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
                    <input type="text" class="form-control" v-model="item.unPattern" />
                </td>
                <td>
                    <MediaType :manager="item.mtManager"></MediaType>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="text-right">
                    <SelectButton
                        :list="codexx"
                        :manager="operation.statusManager"
                    ></SelectButton>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import LayerOperation from '@/model/Entity/LayerOperation'
import LayerPath from '@/model/Entity/LayerPath'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'
import MediaType from './MediaType.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        MediaType,
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
        return {
            codexx: ss.project.getPreset('HttpStatus')!.propertyManager.list,
        }
    },
})
</script>

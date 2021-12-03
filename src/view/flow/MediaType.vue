<template>
    <table class="table">
        <thead>
            <tr>
                <td class="text-right">MediaType</td>
                <td>schema unPattern</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td class="text-right">
                    <div class="btn-group">
                        <DeleteButton :item="item" :manager="manager"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.un }} </span>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.unPattern" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="text-right">
                    <SelectButton
                        @select="select"
                        :list="optionxx"
                        :manager="manager"
                    ></SelectButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import LayerMediaType, { LayerMediaTypeManager } from '@/model/Entity/LayerMediaType'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'

export default defineComponent({
    components: {
        DeleteButton,
        SelectButton,
    },
    props: {
        manager: {
            type: Object as PropType<LayerMediaTypeManager>,
            required: true,
        },
        isResponse: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    setup(props, context) {
        const optionxx = ss.project.getPreset('MediaType')?.propertyManager.list ?? []
        function select(old: LayerMediaType, item: LayerMediaType) {
            if (props.isResponse) {
                item.unPattern = '${schema.un}_Response_${operation.un + path.suffix}'
            }
        }
        return {
            optionxx,
            select,
        }
    },
})
</script>

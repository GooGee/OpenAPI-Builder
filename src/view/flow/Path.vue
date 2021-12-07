<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Path</h2>
        </caption>
        <tbody>
            <tr>
                <td class="text-right w111">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">unPattern</td>
                <td>
                    <input type="text" class="form-control" v-model="item.unPattern" />
                </td>
            </tr>
            <tr>
                <td class="text-right">suffix</td>
                <td>
                    <input type="text" class="form-control" v-model="item.suffix" />
                </td>
            </tr>
            <tr>
                <td class="text-right">parameter</td>
                <td>
                    <EditList :manager="item.parameterManager"></EditList>
                </td>
            </tr>
        </tbody>
    </table>

    <Operation :path="item"></Operation>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import EditList from '../part/EditList.vue'
import Operation from './Operation.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        EditList,
        Operation,
    },
    props: {
        item: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
    },
})
</script>

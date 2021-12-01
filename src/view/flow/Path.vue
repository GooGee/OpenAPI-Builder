<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Path</h2>
        </caption>
        <tbody>
            <tr>
                <td class="text-right">suffix</td>
                <td>
                    <span @click="setSuffix(item)" class="btn btn-outline-primary mr11">
                        {{ item.suffix === '' ? '+' : item.suffix }}
                    </span>
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
import Operation from './Operation.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        Operation,
    },
    props: {
        item: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
    },
    setup(props, context) {
        function setSuffix(item: LayerPath) {
            const text = prompt('', item.suffix)
            if (text === null) {
                return
            }
            item.suffix = text
        }

        return {
            setSuffix,
        }
    },
})
</script>

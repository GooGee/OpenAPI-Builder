<template>
    <table class="table">
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
                <td class="text-right">default</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="default"
                        v-model="item.default"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">enum</td>
                <td>
                    <EditList :manager="item.valueManager"></EditList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import ServerVariable from '@/model/OAPI/ServerVariable'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SortButton from '../button/SortButton.vue'
import EditList from '../part/EditList.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        SortButton,
        EditList,
    },
    props: {
        item: {
            type: Object as PropType<ServerVariable>,
            required: true,
        },
    },
})
</script>

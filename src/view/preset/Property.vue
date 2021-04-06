<template>
    <table v-if="sss.sidebar.item" class="table">
        <thead>
            <tr>
                <th>
                    <SortButton :manager="sss.sidebar.item.propertyManager"></SortButton>
                    ui
                </th>
                <th>value</th>
                <th>tag</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in sss.sidebar.item.propertyManager.list" :key="item.ui">
                <td>
                    <div class="btn-group mr11">
                        <DeleteButton
                            :manager="sss.sidebar.item.propertyManager"
                            :item="item"
                        ></DeleteButton>
                        <ChangeButton :item="item"></ChangeButton>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.value" />
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.tag" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton :manager="sss.sidebar.item.propertyManager"></AddButton>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SortButton from '../button/SortButton.vue'
import sss from '@/sss.ts'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        SortButton,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

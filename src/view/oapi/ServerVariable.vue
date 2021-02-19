<template>
    <table class="table b-table b-table-caption-top">
        <thead>
            <tr>
                <th>ui</th>
                <th>default</th>
                <th>description</th>
                <th>enum</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :item="item"></ChangeButton>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.default" />
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.description" />
                </td>
                <td>
                    <EditList :manager="item.valueManager"></EditList>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton :manager="manager"></AddButton>
                </td>
                <td></td>
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
import EditList from './EditList.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        EditList,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
})
</script>

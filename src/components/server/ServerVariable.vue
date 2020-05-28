<template>
    <table class="table b-table b-table-caption-top">
        <thead>
            <tr>
                <th>name</th>
                <th>default</th>
                <th>description</th>
                <th>enum</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="variable in manager.list" :key="variable.name">
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="variable"></DeleteButton>
                        <ChangeButton :item="variable" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <b-form-input v-model="variable.default"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="variable.description"></b-form-input>
                </td>
                <td>
                    <EditList :manager="variable.valueManager"></EditList>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton :manager="manager" name="name"></AddButton>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '..//AddButton.vue'
import ChangeButton from '..//ChangeButton.vue'
import DeleteButton from '..//DeleteButton.vue'
import EditList from '..//EditList.vue'

export default {
    name: 'ServerVariable',
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
}
</script>

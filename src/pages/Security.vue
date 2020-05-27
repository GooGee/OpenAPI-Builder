<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h1 class="inline mr11px">Security</h1>
            <AddButton :manager="manager" name="name"></AddButton>
        </caption>
        <thead>
            <tr>
                <th>name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="security in manager.list" :key="security.name">
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="security"></DeleteButton>
                        <ChangeButton :item="security" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <EditList :manager="security.valueManager"></EditList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import AddButton from '../components/AddButton.vue'
import ChangeButton from '../components/ChangeButton.vue'
import DeleteButton from '../components/DeleteButton.vue'
import EditList from '../components/EditList.vue'
import builder from '../states/builder.js'

export default {
    name: 'Security',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        EditList,
    },
    data() {
        return {
            manager: builder.document.securityManager,
        }
    },
}
</script>

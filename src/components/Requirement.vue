<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h1 class="inline mr11">SecurityRequirement</h1>
            <b-button @click="show" variant="outline-primary"> + </b-button>
        </caption>
        <thead>
            <tr>
                <th width="111px">name</th>
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
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import EditList from './EditList.vue'
import builder from '../states/builder.js'
import dialogue from '../states/component.js'

export default {
    name: 'Requirement',
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
    methods: {
        show() {
            const type = 'securitySchemes'
            const cb = ok => {
                try {
                    const item = this.manager.make(dialogue.selected.name)
                    this.manager.add(item)
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }

            dialogue.type = type
            dialogue.showOnly(type, cb)
        },
    },
}
</script>

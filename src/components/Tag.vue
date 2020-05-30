<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h1 class="inline mr11">Tag</h1>
            <AddButton :manager="manager" name="name"></AddButton>
        </caption>
        <thead>
            <tr>
                <th>name</th>
                <th>description</th>
                <th>externalDocs.description</th>
                <th>externalDocs.url</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tag in manager.list" :key="tag.name">
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="tag"></DeleteButton>
                        <ChangeButton :item="tag" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <b-form-input v-model="tag.description"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="tag.externalDocs.description"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="tag.externalDocs.url"></b-form-input>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import builder from '../states/builder.js'

export default {
    name: 'Tag',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    data() {
        return {
            manager: builder.document.tagManager,
        }
    },
}
</script>

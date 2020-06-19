<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h1 class="inline mr11">Tag</h1>
            <b-button-group>
                <AddButton :manager="manager" name="name"></AddButton>
                <ImportButton :manager="manager"></ImportButton>
            </b-button-group>
        </caption>
        <thead>
            <tr>
                <th class="text-right">name</th>
                <th>description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tag in manager.list" :key="tag.name">
                <td class="text-right">
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="tag"></DeleteButton>
                        <ChangeButton :item="tag" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <b-form-input v-model="tag.description"></b-form-input>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">
                    <Script :manager="manager" name="scriptTag"></Script>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import ImportButton from './button/ImportButton.vue'
import Script from './Script.vue'
import builder from '../states/builder.js'

export default {
    name: 'Tag',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        ImportButton,
        Script,
    },
    data() {
        return {
            manager: builder.document.tagManager,
        }
    },
}
</script>

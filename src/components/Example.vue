<template>
    <div class="row">
        <SideBar :manager="manager" title="Example" class="col-3"></SideBar>

        <div class="col-9">
            <table v-if="sidebar.item" class="table b-table">
                <tbody>
                    <tr>
                        <td width="111px"></td>
                        <td>
                            <b-button-group>
                                <DeleteButton :manager="manager" :item="sidebar.item"></DeleteButton>
                                <ChangeButton :item="sidebar.item" name="name"></ChangeButton>
                            </b-button-group>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">description</td>
                        <td>
                            <b-form-input v-model="sidebar.item.description"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">externalValue</td>
                        <td>
                            <b-form-input v-model="sidebar.item.externalValue"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">summary</td>
                        <td>
                            <b-form-input v-model="sidebar.item.summary"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">value</td>
                        <td>
                            <b-form-input v-model="sidebar.item.value"></b-form-input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Example',
    components: {
        ChangeButton,
        DeleteButton,
        SideBar,
    },
    data() {
        return {
            sidebar,
            manager: builder.document.component.exampleManager,
        }
    },
}
</script>

<template>
    <div class="row">
        <SideBar :manager="manager" title="RequestBody" class="col-3"></SideBar>

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
                        <td class="text-right">required</td>
                        <td>
                            <b-form-radio-group v-model="sidebar.item.required">
                                <b-form-radio :value="true">true</b-form-radio>
                                <b-form-radio :value="false">false</b-form-radio>
                            </b-form-radio-group>
                        </td>
                    </tr>
                </tbody>
            </table>

            <MediaTypeList v-if="sidebar.item" :manager="sidebar.item.mediaTypeManager"></MediaTypeList>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'
import MediaTypeList from './specification/MediaTypeList.vue'

export default {
    name: 'RequestBody',
    components: {
        ChangeButton,
        DeleteButton,
        MediaTypeList,
        SideBar,
    },
    data() {
        return {
            sidebar,
            manager: builder.document.component.requestBodyManager,
        }
    },
}
</script>

<template>
    <div class="row">
        <SideBar :manager="manager" title="Response" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <template v-if="sidebar.item">
                <table class="table">
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
                    </tbody>
                </table>

                <MediaTypeList :manager="sidebar.item.mediaTypeManager"></MediaTypeList>

                <ReferenceList :manager="sidebar.item.headerManager" type="headers">
                    <h2 class="inline mr11">headers</h2>
                </ReferenceList>
            </template>

            <Script v-else :manager="manager" name="scriptResponse" item="Response" class="mtb11"></Script>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './SideBar.vue'
import Script from './Script.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'
import MediaTypeList from './specification/MediaTypeList.vue'
import ReferenceList from './specification/ReferenceList.vue'

export default {
    name: 'Response',
    components: {
        ChangeButton,
        DeleteButton,
        MediaTypeList,
        ReferenceList,
        SideBar,
        Script,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.component.responseManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

<template>
    <div class="row">
        <SideBar :manager="manager" title="Path" name="path" value="/user" class="col-3"></SideBar>

        <div v-if="ready" class="col-9 mtb11">
            <template v-if="sidebar.item">
                <div>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="sidebar.item"></DeleteButton>
                        <ChangeButton :item="sidebar.item" name="name"></ChangeButton>
                    </b-button-group>
                </div>

                <OperationList :manager="sidebar.item.operationManager"></OperationList>
            </template>

            <Script v-else :manager="manager" name="scriptPath" item="path"></Script>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import OperationList from './specification/OperationList.vue'
import Script from './Script.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'PathPage',
    components: {
        ChangeButton,
        DeleteButton,
        OperationList,
        Script,
        SideBar,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.pathManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

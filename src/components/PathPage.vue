<template>
    <div class="row">
        <SideBar :manager="manager" title="Path" name="path" class="col-3"></SideBar>

        <div v-if="ready && sidebar.item" class="col-9">
            <div class="mtb11">
                <b-button-group>
                    <DeleteButton :manager="manager" :item="sidebar.item"></DeleteButton>
                    <ChangeButton :item="sidebar.item" name="name"></ChangeButton>
                </b-button-group>
            </div>

            <OperationList :manager="sidebar.item.operationManager"></OperationList>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import OperationList from './specification/OperationList.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'PathPage',
    components: {
        ChangeButton,
        DeleteButton,
        OperationList,
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

<template>
    <div class="row">
        <SideBar :manager="manager" title="Preset" class="col-3"></SideBar>

        <div v-if="ready" class="col-9">
            <PropertyList v-if="sidebar.item" :manager="sidebar.item.propertyManager">
                <b-button-group v-if="sidebar.item.custom" class="mr11 mb11">
                    <DeleteButton :manager="manager" :item="sidebar.item"></DeleteButton>
                    <ChangeButton :item="sidebar.item" name="name"></ChangeButton>
                </b-button-group>
                <h2 v-else>{{ sidebar.item.name }}</h2>
                <b-form-input v-model="sidebar.item.description" placeholder="description"></b-form-input>
            </PropertyList>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './SideBar.vue'
import PropertyList from './PropertyList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Preset',
    components: {
        ChangeButton,
        DeleteButton,
        SideBar,
        PropertyList,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.presetManager,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

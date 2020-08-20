<template>
    <div>
        <div class="text-center mtb11">
            <h2 @click="sidebar.item = null" class="inline mr11 button">{{ title }}</h2>
            <b-button-group>
                <AddButton :manager="manager" :name="name" :value="value"></AddButton>
                <ImportButton :manager="manager" :name="title"></ImportButton>
            </b-button-group>
        </div>

        <div class="mb11">
            <b-form-input v-model="sidebar.search" placeholder="Search"></b-form-input>
        </div>

        <div>
            <div
                v-for="item in sidebar.list"
                :key="item.name"
                @click="sidebar.item = item"
                :class="Object.is(sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
import AddButton from './button/AddButton.vue'
import ImportButton from './button/ImportButton.vue'
import sidebar from '../states/sidebar.js'

export default {
    name: 'SideBar',
    components: {
        AddButton,
        ImportButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: false,
            default: 'name',
        },
        value: {
            type: String,
            required: false,
            default: 'name',
        },
    },
    data() {
        return {
            sidebar,
        }
    },
    created() {
        sidebar.show(this.title, this.manager)
    },
}
</script>

<style>
h2.button {
    cursor: pointer;
}
</style>

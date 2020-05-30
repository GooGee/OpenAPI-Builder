<template>
    <div>
        <div class="text-center mtb11px">
            <h2 class="inline mr11px">{{ title }}</h2>
            <AddButton :manager="manager" :name="name"></AddButton>
        </div>

        <div>
            <div
                v-for="item in manager.list"
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
import sidebar from '../states/sidebar.js'

export default {
    name: 'SideBar',
    components: { AddButton },
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
            default: 'name'
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

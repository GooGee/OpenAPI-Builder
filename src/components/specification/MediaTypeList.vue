<template>
    <div>
        <div>
            <h2 class="inline mr11">content</h2>
            <AddButton :manager="manager" name="name" class="mr11"></AddButton>
            <b-form-select @change="add" :options="typeList" class="wa"></b-form-select>
        </div>
        <br />
        <MediaType v-for="item in manager.list" :item="item" :manager="manager" :key="item.name"></MediaType>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import MediaType from './MediaType.vue'

export default {
    name: 'MediaTypeList',
    components: {
        AddButton,
        MediaType,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            typeList: ['application/json', 'application/xml', 'text/plain', '*/*'],
        }
    },
    methods: {
        add(name) {
            try {
                const item = this.manager.make(name)
                this.manager.add(item)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>

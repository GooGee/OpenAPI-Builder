<template>
    <div>
        <div class="mtp11">
            <h2 class="inline mr11">content</h2>
            <AddButton :manager="manager" name="name" class="mr11"></AddButton>
            <SelectButton :list="typeList" :manager="manager" name="name" text="name"></SelectButton>
        </div>
        <MediaType v-for="item in manager.list" :item="item" :manager="manager" :key="item.name"></MediaType>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import MediaType from './MediaType.vue'
import SelectButton from '../button/SelectButton.vue'
import builder from '../../states/builder.js'

export default {
    name: 'MediaTypeList',
    components: {
        AddButton,
        MediaType,
        SelectButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.typeList = builder.presetManager.find('MediaType').propertyManager.list
    },
    data() {
        return {
            editing: false,
            typeList: [],
        }
    },
}
</script>

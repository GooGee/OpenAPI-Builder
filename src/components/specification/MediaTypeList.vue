<template>
    <div>
        <div class="mtb11">
            <h2 class="inline mr11">content</h2>
            <SelectButton :list="typeList" :manager="manager" name="name" text="name"></SelectButton>
        </div>
        <MediaType v-for="item in manager.list" :item="item" :manager="manager" :key="item.name"></MediaType>
    </div>
</template>

<script>
import MediaType from './MediaType.vue'
import SelectButton from '../button/SelectButton.vue'
import builder from '../../states/builder.js'

export default {
    name: 'MediaTypeList',
    components: {
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

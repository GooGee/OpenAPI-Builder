<template>
    <div>
        <div>
            <h2 class="inline mr11">content</h2>
            <AddButton :manager="manager" name="name" class="mr11"></AddButton>
            <SelectButton :list="typeList" :manager="manager"></SelectButton>
        </div>
        <br />
        <MediaType v-for="item in manager.list" :item="item" :manager="manager" :key="item.name"></MediaType>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import MediaType from './MediaType.vue'
import SelectButton from '../button/SelectButton.vue'

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
    data() {
        return {
            editing: false,
            typeList: ['application/json', 'application/xml', 'text/plain', '*/*'],
        }
    },
}
</script>

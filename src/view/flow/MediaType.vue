<template>
    <EditList :manager="manager" :canAdd="false" :canEdit="false"></EditList>
    <SelectButton :list="optionxx" :manager="manager"></SelectButton>
</template>

<script lang="ts">
import { LayerMediaTypeManager } from '@/model/Entity/LayerMediaType'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import SelectButton from '../button/SelectButton.vue'
import EditList from '../part/EditList.vue'

export default defineComponent({
    components: {
        EditList,
        SelectButton,
    },
    props: {
        manager: {
            type: Object as PropType<LayerMediaTypeManager>,
            required: true,
        },
    },
    setup(props, context) {
        const optionxx = ss.project.getPreset('MediaType')?.propertyManager.list ?? []
        return {
            optionxx,
        }
    },
})
</script>

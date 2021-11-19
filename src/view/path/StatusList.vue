<template>
    <NameReferenceList :manager="manager">
        <SelectButton :list="codexx" :manager="manager"></SelectButton>
    </NameReferenceList>
</template>

<script lang="ts">
import { NameReferenceManager } from '@/model/OAPI/NameReference'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import SelectButton from '../button/SelectButton.vue'
import NameReferenceList from '../oapi/NameReferenceList.vue'

export default defineComponent({
    components: {
        NameReferenceList,
        SelectButton,
    },
    props: {
        manager: {
            type: Object as PropType<NameReferenceManager>,
            required: true,
        },
    },
    setup(props, context) {
        return {
            codexx: ss.project.getPreset('HttpStatus')!.propertyManager.list,
        }
    },
})
</script>

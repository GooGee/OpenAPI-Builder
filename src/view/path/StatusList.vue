<template>
    <div>
        <div>
            <SelectButton :list="codexx" :manager="manager"></SelectButton>
        </div>

        <div v-for="item in manager.list" :key="item.id" class="mtb11">
            <div class="btn-group">
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <ChangeButton :manager="manager" :item="item"></ChangeButton>
                <Reference :reference="item.response" type="responses"></Reference>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { StatusManager } from '@/model/OAPI/Status'
import { defineComponent, PropType } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from '../oapi/Reference.vue'
import SelectButton from '../button/SelectButton.vue'
import ss from '@/ss'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        Reference,
        SelectButton,
    },
    props: {
        manager: {
            type: Object as PropType<StatusManager>,
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

<template>
    <div>
        <div>
            <SelectButton :list="codexx" :manager="manager"></SelectButton>
        </div>

        <div v-for="item in manager.list" :key="item.ui" class="mtb11">
            <div class="btn-group">
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <ChangeButton :item="item"></ChangeButton>
                <Reference :reference="item.response" type="responses"></Reference>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from '../oapi/Reference.vue'
import SelectButton from '../button/SelectButton.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        Reference,
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
            codexx: sss.getProject().getPreset('HttpStatus')!.propertyManager.list,
        }
    },
})
</script>

<template>
    <div v-for="item in manager.list" :key="item.ui" class="mtb11">
        <div class="btn-group">
            <DeleteButton :manager="manager" :item="item"></DeleteButton>
            <ChangeButton :manager="manager" :item="item"></ChangeButton>
            <Reference :reference="item.path"></Reference>
        </div>
    </div>
    <AddButton :manager="manager"></AddButton>
</template>

<script lang="ts">
import { CallBackManager } from '@/model/OAPI/CallBack'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from '../oapi/Reference.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        Reference,
    },
    props: {
        manager: {
            type: Object as PropType<CallBackManager>,
            required: true,
        },
    },
})
</script>

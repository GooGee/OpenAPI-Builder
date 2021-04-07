<template>
    <div>
        <div v-for="item in manager.list" :key="item.ui" class="mb11">
            <div class="btn-group">
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <ChangeButton v-if="canEdit" :manager="manager" :item="item"></ChangeButton>
                <span v-else class="btn btn-outline-secondary"> {{ item.ui }} </span>
            </div>
        </div>

        <AddButton v-if="canAdd" :manager="manager"></AddButton>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        canAdd: {
            type: Boolean,
            required: false,
            default: true,
        },
        canEdit: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
})
</script>

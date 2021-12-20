<template>
    <div>
        <div v-for="item in manager.list" :key="item.ui" class="mb11">
            <div class="btn-group">
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <ChangeButton
                    v-if="canEdit"
                    :manager="manager"
                    :item="item"
                ></ChangeButton>
                <span v-else class="btn btn-outline-secondary"> {{ item.un }} </span>
            </div>
        </div>

        <AddButton v-if="canAdd" :value="value" :manager="manager"></AddButton>
    </div>
</template>

<script lang="ts">
import UniqueItemManagerInterface from '@/model/Entity/UniqueItemManagerInterface'
import { defineComponent, PropType } from 'vue'
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
            type: Object as PropType<UniqueItemManagerInterface>,
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
        value: {
            type: String,
            required: false,
            default: 'name',
        },
    },
})
</script>

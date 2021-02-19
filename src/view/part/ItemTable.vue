<template>
    <table class="table">
        <caption class="caption-top">
            <slot name="caption"></slot>
        </caption>
        <thead>
            <tr>
                <th class="w111">ui</th>
                <th>description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton v-if="canEdit" :item="item"></ChangeButton>
                        <span v-else class="btn btn-outline-secondary"> {{ item.ui }} </span>
                    </div>
                </td>
                <td>
                    <input v-model="item.description" type="text" class="form-control" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton v-if="canAdd" :manager="manager"></AddButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
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

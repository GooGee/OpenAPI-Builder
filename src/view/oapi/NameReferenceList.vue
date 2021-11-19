<template>
    <table class="table">
        <thead>
            <tr>
                <th class="w111">un</th>
                <th>reference</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :manager="manager" :item="item"></ChangeButton>
                    </div>
                </td>
                <td>
                    <Reference :reference="item.reference"></Reference>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td><slot></slot></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { NameReferenceManager } from '@/model/OAPI/NameReference'
import { defineComponent, PropType } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from '../oapi/Reference.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        Reference,
    },
    props: {
        manager: {
            type: Object as PropType<NameReferenceManager>,
            required: true,
        },
    },
})
</script>

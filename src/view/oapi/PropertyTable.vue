<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">ui</td>
                <td>
                    <h5 v-if="sss.sidebar.item.required" class="inline mr11">
                        {{ sss.sidebar.item.ui }}
                    </h5>
                    <div v-else class="btn-group mr11">
                        <DeleteButton
                            :manager="sss.sidebar.manager"
                            :item="sss.sidebar.item"
                            @deleted="sss.sidebar.item = null"
                        ></DeleteButton>
                        <ChangeButton :item="sss.sidebar.item"></ChangeButton>
                    </div>
                    <CloneButton
                        :manager="sss.sidebar.manager"
                        :item="sss.sidebar.item"
                    ></CloneButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <textarea
                        v-model="sss.sidebar.item.description"
                        class="form-control"
                        spellcheck="false"
                        rows="3"
                    ></textarea>
                </td>
            </tr>
            <slot></slot>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import CloneButton from '../button/CloneButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import sss from '@/sss.ts'

export default defineComponent({
    components: {
        ChangeButton,
        CloneButton,
        DeleteButton,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

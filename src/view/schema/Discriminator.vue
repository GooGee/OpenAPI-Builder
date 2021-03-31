<template>
    <div v-if="sss.sidebar.item.isComposition">
        <input
            type="text"
            class="form-control mt11"
            v-model="sss.sidebar.item.composition.discriminator.propertyName"
            placeholder="propertyName"
        />

        <table class="table">
            <caption class="caption-top">
                <h4>mapping</h4>
            </caption>
            <thead>
                <tr>
                    <th class="w111">ui</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in sss.sidebar.item.composition.discriminator.manager.list"
                    :key="item.ui"
                >
                    <td>
                        <div class="btn-group">
                            <DeleteButton
                                :manager="sss.sidebar.item.composition.discriminator.manager"
                                :item="item"
                            ></DeleteButton>
                            <ChangeButton :item="item"></ChangeButton>
                        </div>
                    </td>
                    <td>
                        <input v-model="item.value" type="text" class="form-control" />
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <AddButton
                            :manager="sss.sidebar.item.composition.discriminator.manager"
                        ></AddButton>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

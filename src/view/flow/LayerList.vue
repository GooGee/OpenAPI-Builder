<template>
    <table class="table">
        <thead>
            <tr>
                <td>un</td>
                <td>useExisted</td>
                <td>reference / unPattern</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :item="item" :manager="manager"></DeleteButton>
                        <ChangeButton :item="item" :manager="manager"></ChangeButton>
                    </div>
                </td>
                <td>
                    <label class="mr11">
                        <input v-model="item.useExisted" :value="true" type="radio" />
                        existed
                    </label>
                    <label>
                        <input v-model="item.useExisted" :value="false" type="radio" />
                        new
                    </label>
                </td>
                <td>
                    <Reference
                        v-if="item.useExisted"
                        :reference="item.reference"
                    ></Reference>
                    <input
                        v-else
                        type="text"
                        class="form-control"
                        v-model="item.unPattern"
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <AddButton :manager="manager"></AddButton>
</template>

<script lang="ts">
import { LayerManager } from '@/model/Entity/Layer'
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
            type: Object as PropType<LayerManager>,
            required: true,
        },
    },
})
</script>

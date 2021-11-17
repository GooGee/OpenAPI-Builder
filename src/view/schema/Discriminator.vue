<template>
    <div v-if="sidebar.item.isComposition">
        <input
            type="text"
            class="form-control mt11"
            v-model="discriminator.propertyName"
            placeholder="propertyName"
        />

        <table class="table">
            <caption class="caption-top">
                <h4>mapping</h4>
            </caption>
            <thead>
                <tr>
                    <th class="w111">un</th>
                    <th>schema path</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in discriminator.manager.list" :key="item.ui">
                    <td>
                        <div class="btn-group">
                            <DeleteButton
                                :manager="discriminator.manager"
                                :item="item"
                            ></DeleteButton>
                            <ChangeButton
                                :manager="discriminator.manager"
                                :item="item"
                            ></ChangeButton>
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
                        <AddButton :manager="discriminator.manager"></AddButton>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import { defineComponent, inject, ref, watch } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<SchemaComplex>
        function getDiscriminator() {
            return sidebar.item!.discriminator
        }
        const discriminator = ref(getDiscriminator())
        watch(sidebar.item!, () => (discriminator.value = getDiscriminator()))
        return { discriminator, sidebar }
    },
})
</script>

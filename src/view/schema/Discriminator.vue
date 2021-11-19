<template>
    <div v-if="sidebar.item.isComposition">
        <input
            type="text"
            class="form-control mt11"
            v-model="sidebar.item.discriminator.propertyName"
            placeholder="propertyName"
        />
        <h4 class="mtb11">mapping</h4>
        <NameReferenceList :manager="sidebar.item.discriminator.referenceManager">
            <AddButton
                :manager="sidebar.item.discriminator.referenceManager"
            ></AddButton>
        </NameReferenceList>
    </div>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import { defineComponent, inject } from 'vue'
import AddButton from '../button/AddButton.vue'
import NameReferenceList from '../oapi/NameReferenceList.vue'

export default defineComponent({
    components: {
        AddButton,
        NameReferenceList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<SchemaComplex>
        return { sidebar }
    },
})
</script>

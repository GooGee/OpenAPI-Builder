<template>
    <span v-if="sss.sidebar.item.isObject" class="mtb11">Only for composition</span>
    <div v-else>
        <input
            type="text"
            class="form-control mt11"
            v-model="sss.sidebar.item.composition.discriminator.propertyName"
            placeholder="propertyName"
        />
        <ItemTable :manager="sss.sidebar.item.composition.discriminator.manager" class="mt11">
            <template v-slot:caption>
                <h4>mapping</h4>
            </template>
        </ItemTable>
    </div> </template
>>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ItemTable from '../part/ItemTable.vue'

export default defineComponent({
    components: {
        ItemTable,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

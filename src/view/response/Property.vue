<template>
    <PropertyTable>
        <tr v-if="required">
            <td class="text-right">required</td>
            <td>
                <span class="custom-control custom-switch">
                    <input
                        id="required"
                        v-model="sss.sidebar.item.required"
                        type="checkbox"
                        class="custom-control-input"
                    />
                    <label for="required" class="custom-control-label"></label>
                </span>
            </td>
        </tr>
    </PropertyTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import PropertyTable from '../oapi/PropertyTable.vue'

export default defineComponent({
    components: {
        PropertyTable,
    },
    data() {
        return {
            sss,
            required: this.$router.currentRoute.value.path === '/request/property',
        }
    },
})
</script>

<template>
    <PropertyTable>
        <tr>
            <td class="text-right">summary</td>
            <td>
                <input type="text" class="form-control" v-model="sss.sidebar.item.summary" />
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
        }
    },
})
</script>

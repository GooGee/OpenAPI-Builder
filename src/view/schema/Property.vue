<template>
    <PropertyTable>
        <tr>
            <td class="text-right">example</td>
            <td>
                <textarea
                    v-model="sss.sidebar.item.example"
                    class="form-control"
                    spellcheck="false"
                    rows="3"
                ></textarea>
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

<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w222">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">url</td>
                <td>
                    <input type="text" class="form-control" v-model="item.url" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import External from '@/model/OAPI/External'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<External>,
            required: true,
        },
    },
})
</script>

<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right" width="222px">description</td>
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
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: External,
            required: true,
        },
    },
})
</script>

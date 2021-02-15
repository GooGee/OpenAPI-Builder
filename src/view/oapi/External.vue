<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right" width="222px">description</td>
                <td>
                    <input type="text" class="form-control" v-model="item.description" />
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
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
})
</script>

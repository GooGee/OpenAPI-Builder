<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <input type="text" class="form-control" v-model="info.contact.name" />
                </td>
            </tr>
            <tr>
                <td class="text-right">email</td>
                <td>
                    <input type="text" class="form-control" v-model="info.contact.email" />
                </td>
            </tr>
            <tr>
                <td class="text-right">url</td>
                <td>
                    <input type="text" class="form-control" v-model="info.contact.url" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'

export default defineComponent({
    data() {
        return {
            info: sss.project?.oapi.info,
        }
    },
})
</script>

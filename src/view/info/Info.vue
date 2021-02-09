<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right" width="222px">title</td>
                <td>
                    <input type="text" class="form-control" v-model="info.title" />
                </td>
            </tr>
            <tr>
                <td class="text-right">version</td>
                <td>
                    <input type="text" class="form-control" v-model="info.version" />
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <input type="text" class="form-control" v-model="info.description" />
                </td>
            </tr>
            <tr>
                <td class="text-right">termsOfService</td>
                <td>
                    <input type="text" class="form-control" v-model="info.termsOfService" />
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

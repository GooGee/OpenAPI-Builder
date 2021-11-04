<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w222">title</td>
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
                    <input
                        type="text"
                        class="form-control"
                        v-model="info.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">termsOfService</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="info.termsOfService"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import ss from '@/ss'
import { defineComponent } from 'vue'

export default defineComponent({
    setup(props, context) {
        const info = ss.project.oapi.info
        return { info }
    },
})
</script>

<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <input type="text" class="form-control" v-model="license.name" />
                </td>
            </tr>
            <tr>
                <td class="text-right">url</td>
                <td>
                    <input type="text" class="form-control" v-model="license.url" />
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
        const license = ss.project.oapi.info.license
        return { license }
    },
})
</script>

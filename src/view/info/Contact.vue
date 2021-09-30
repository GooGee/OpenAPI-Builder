<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <input type="text" class="form-control" v-model="contact.name" />
                </td>
            </tr>
            <tr>
                <td class="text-right">email</td>
                <td>
                    <input type="text" class="form-control" v-model="contact.email" />
                </td>
            </tr>
            <tr>
                <td class="text-right">url</td>
                <td>
                    <input type="text" class="form-control" v-model="contact.url" />
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
        const contact = ss.project.oapi.info.contact
        return { contact }
    },
})
</script>

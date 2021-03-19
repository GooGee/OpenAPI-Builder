<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-success">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Save
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import callJava from '@/helper/callJava'

export default defineComponent({
    setup() {
        const ddd = callJava((route, toast) => {
            sss.service.save(sss.getProject(), response => {
                toast.show(response.message, response.status)
            })
        })
        return ddd
    },
})
</script>

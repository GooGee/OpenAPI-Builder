<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-success">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Save
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import Toast from '../hook/Toast'
import Wait from '../hook/Wait'

export default defineComponent({
    setup() {
        const ddd = Wait(() => {
            sss.service.save(sss.getProject(), response => {
                Toast(response)
                ddd.stopWaiting()
            })
        })
        return ddd
    },
})
</script>

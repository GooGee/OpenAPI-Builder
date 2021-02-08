<template>
    <div>
        <div class="text-center" style="margin-top: 11%;">
            <img v-if="sss.ready" alt="logo" src="logo.svg" style="width: 222px;" />
            <img v-else alt="loading" src="loading.svg" class="mb11" />
            <h1>OpenAPI GUI</h1>
            <p>{{ version }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'

export default defineComponent({
    data() {
        return {
            sss,
            version: process.env.VUE_APP_VERSION,
        }
    },
})
</script>

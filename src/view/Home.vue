<template>
    <div>
        <div class="text-center" style="margin-top: 11%;">
            <img v-if="ready" alt="logo" src="logo.svg" style="width: 222px;" />
            <img v-else alt="loading" src="loading.svg" class="mb11" />
            <h1>OpenAPI GUI</h1>
            <p>{{ version }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { EventEnum } from '@/model/Event/StateEvent'

export default defineComponent({
    data() {
        return {
            ready: sss.ready,
            version: process.env.VUE_APP_VERSION,
        }
    },
    created() {
        sss.event.state.ee.on(EventEnum.AfterProjectLoad, data => (this.ready = true))
    },
})
</script>

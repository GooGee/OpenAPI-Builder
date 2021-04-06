<template>
    <div>
        <div class="text-center" style="margin-top: 11%">
            <img v-if="ready" alt="logo" src="../assets/image/logo.svg" style="width: 222px" />
            <img v-else alt="loading" src="../assets/image/loading.svg" class="mb11" />
            <h1>OpenAPI GUI</h1>
            <p>{{ version }}</p>
            <p v-if="sss.inBrowser">
                <span @click="add" class="btn btn-outline-primary"> New </span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { ActionEnum } from '@/model/Bridge/FromJava/ActionEnum'
import Response from '@/model/Bridge/FromJava/Response'
import { EventEnum } from '@/model/Event/StateEvent'

export default defineComponent({
    data() {
        return {
            sss,
            ready: sss.ready,
            version: process.env.VUE_APP_VERSION,
        }
    },
    created() {
        sss.event.state.ee.on(EventEnum.AfterProjectLoad, data => (this.ready = true))
    },
    methods: {
        add() {
            const cefw = window as any
            const response = new Response(ActionEnum.load, 'project', '', '', 444)
            cefw.bridge.call(response)
        },
    },
})
</script>

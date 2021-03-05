<template>
    <div>
        <div class="text-center" style="margin-top: 11%">
            <img v-if="ready" alt="logo" src="logo.svg" style="width: 222px" />
            <img v-else alt="loading" src="loading.svg" class="mb11" />
            <h1>OpenAPI GUI</h1>
            <p>{{ version }}</p>
            <p v-if="isDev">
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
import CEFW from '@/model/Bridge/ToJava/CEFW'
import { EventEnum } from '@/model/Event/StateEvent'

export default defineComponent({
    data() {
        return {
            ready: sss.ready,
            version: process.env.VUE_APP_VERSION,
            isDev: process.env.NODE_ENV === 'development',
        }
    },
    created() {
        sss.event.state.ee.on(EventEnum.AfterProjectLoad, data => (this.ready = true))
    },
    methods: {
        add() {
            function setJavaBridge(cefw: CEFW) {
                cefw.JavaBridge = {
                    call(text) {
                        const json = JSON.parse(text)
                        console.log(json.data)
                        json.data = ''
                        json.status = 200
                        json.message = 'Echo OK'
                        cefw.bridge.call(json)
                    },
                }

                const response = new Response(ActionEnum.load, 'project', '', '', 444)
                cefw.bridge.call(response)
            }

            setJavaBridge(window as any)
        },
    },
})
</script>

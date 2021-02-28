<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-primary">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Run
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import Toast from '../hook/Toast'
import Wait from '../hook/Wait'
import { EventEnum } from '@/model/Event/StateEvent'

export default defineComponent({
    props: {
        code: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const ddd = Wait(() => {
            sss.run(props.code)
            ddd.stopWaiting()
            sss.event.state.ee.emit(EventEnum.AfterCodeRun, {})
        })
        return ddd
    },
})
</script>

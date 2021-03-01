<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-primary">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Run
    </span>
</template>

<script lang="ts">
import Noty from 'noty'
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import Toast from '../hook/Toast'
import Wait from '../hook/Wait'
import { EventEnum } from '@/model/Event/StateEvent'
import Script from '@/model/Data/Script'

export default defineComponent({
    props: {
        item: {
            type: Script,
            required: true,
        },
    },
    setup(props) {
        const ddd = Wait(() => {
            sss.run(props.item.code)
            ddd.stopWaiting()
            sss.event.state.ee.emit(EventEnum.AfterCodeRun, {})
            new Noty({
                text: 'OK! Run ' + props.item.ui,
                theme: 'bootstrap-v4',
                timeout: 3331,
                type: 'info',
            }).show()
        })
        return ddd
    },
})
</script>

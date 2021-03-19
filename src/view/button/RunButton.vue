<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-primary">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Run
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import Wait from '@/store/wait'
import { EventEnum } from '@/model/Event/StateEvent'
import Script from '@/model/Data/Script'
import toast from '@/helper/toast'

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
            toast.toast('OK! Run ' + props.item.ui)
        })
        return ddd
    },
})
</script>

<template>
    <span
        @click="run"
        :class="waiting ? 'disabled' : ''"
        class="btn btn-outline-primary"
    >
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Run
    </span>
</template>

<script lang="ts">
import Script from '@/model/Entity/Script'
import UniqueItem from '@/model/Entity/UniqueItem'
import Text from '@/model/Service/Text'
import Timer from '@/model/Service/Timer'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        schema: {
            type: Object as PropType<UniqueItem>,
            required: false,
            default: undefined,
        },
        script: {
            type: Object as PropType<Script>,
            required: true,
        },
    },
    setup(props, context) {
        const dd = Timer.wait(() => {
            Text.run(props.script.code, ss, props.schema)
            context.emit('run')
            Toast.success('OK! Run ' + props.script.un)
            dd.stopWaiting()
        })
        return dd
    },
})
</script>

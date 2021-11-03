<template>
    <span
        @click="run"
        :class="waiting ? 'disabled' : ''"
        class="btn btn-outline-success"
    >
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Edit
    </span>
</template>

<script lang="ts">
import Script from '@/model/Entity/Script'
import Timer from '@/model/Service/Timer'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { defineComponent, inject, PropType } from 'vue'

export default defineComponent({
    props: {
        file: {
            type: String,
            required: true,
        },
        item: {
            type: Object as PropType<Script>,
            required: true,
        },
    },
    setup(props, context) {
        const inBrowser = inject('inBrowser', true)
        const dd = Timer.wait(() => {
            if (inBrowser) {
                Toast.error('No available in browser')
                return
            }
            ss.worker.edit(props.file, props.item.code, (response) => {
                props.item.code = response.data
                Toast.show(response.message, response.status)
                dd.stopWaiting()
            })
        })
        return dd
    },
})
</script>

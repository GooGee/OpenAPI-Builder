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
import Timer from '@/model/Service/Timer'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        code: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        const dd = Timer.wait(() => {
            ss.worker.edit(props.file, props.code, (response) => {
                context.emit('update:code', response.data)
                Toast.show(response.message, response.status)
                dd.stopWaiting()
            })
        })
        return dd
    },
})
</script>

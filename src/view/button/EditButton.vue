<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-success">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Edit
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import callJava from '@/helper/callJava'

export default defineComponent({
    props: {
        file: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        const ddd = callJava((route, toast) => {
            route.edit(props.file, props.code, response => {
                toast.show(response.message, response.status)
                context.emit('update:code', response.data)
            })
        })
        return ddd
    },
})
</script>

<template>
    <span @click="call" :disabled="waiting" class="btn btn-outline-success">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Edit
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import Toast from '../hook/Toast'
import Wait from '../hook/Wait'

export default defineComponent({
    props: {
        file: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const ddd = Wait(() => {
            sss.route.edit(props.file, props.content, response => {
                Toast(response)
                ddd.waiting.value = false
            })
        })
        return ddd
    },
})
</script>

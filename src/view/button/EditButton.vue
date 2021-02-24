<template>
    <span @click="run" :disabled="waiting" class="btn btn-outline-success">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Edit
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'

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
    data() {
        return {
            waiting: false,
        }
    },
    methods: {
        run() {
            if (this.waiting) {
                return
            }

            this.waiting = true
            try {
                sss.route.edit(this.file, this.content, response => {
                    this.waiting = false
                    this.$emit('back', response)
                })
            } catch (error) {
                this.waiting = false
                alert(error)
            }
        },
    },
})
</script>

<template>
    <span @click="write" :disabled="waiting" class="btn btn-outline-success">
        <span v-if="waiting" class="spinner-border spinner-border-sm"></span>
        Save
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'

export default defineComponent({
    data() {
        return {
            waiting: false,
        }
    },
    methods: {
        write() {
            if (this.waiting) {
                return
            }

            this.waiting = true
            try {
                sss.service.save(sss.getProject(), response => {
                    this.waiting = false
                    alert(response.message)
                })
            } catch (error) {
                this.waiting = false
                alert(error)
            }
        },
    },
})
</script>

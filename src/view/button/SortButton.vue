<template>
    <span @click="sort(true)" :class="asc ? '' : 'clgray'">▲</span>
    <span @click="sort(false)" :class="asc ? 'clgray' : ''">▼</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            asc: true,
        }
    },
    methods: {
        sort(asc: boolean) {
            this.asc = asc
            this.manager.sort(this.asc)
        },
    },
})
</script>

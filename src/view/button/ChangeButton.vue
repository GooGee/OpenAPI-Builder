<template>
    <span class="btn btn-outline-secondary"> {{ item.ui }} </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
})
</script>

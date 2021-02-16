<template>
    <div class="btn-group">
        <span
            @click="$emit('select', item)"
            v-for="item in list"
            :key="item"
            class="btn"
            :class="item === name ? 'btn-outline-primary' : 'btn-outline-secondary'"
        >
            {{ item }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        },
    },
})
</script>

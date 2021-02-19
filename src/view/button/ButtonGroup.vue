<template>
    <div class="btn-group">
        <span
            @click="$emit('select', item)"
            v-for="item in list"
            :key="item"
            class="btn"
            :class="manager.find(item) ? 'btn-outline-primary' : 'btn-outline-secondary'"
        >
            <span :class="item === name ? 'text-primary' : ''">
                {{ item }}
            </span>
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
        manager: {
            type: Object,
            required: true,
        },
    },
})
</script>

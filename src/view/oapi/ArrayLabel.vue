<template>
    <label>
        <input
            :checked="value"
            @input="$emit('update:isArray', $event.target.checked)"
            class="mr3"
            type="checkbox"
        />
        <span :class="{ 'text-secondary': !isArray }">Array</span>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isArray: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        value(): boolean {
            return this.isArray
        },
    },
})
</script>

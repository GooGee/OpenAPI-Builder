<template>
    <div class="btn-group">
        <span
            @click="$emit('select', item)"
            v-for="item in list"
            :key="item"
            class="btn"
            :class="item === name ? 'btn-primary' : 'btn-outline-secondary'"
        >
            <span :class="textColor(item)">
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
    methods: {
        textColor(item: string) {
            if (item === this.name) {
                return ''
            }
            if (this.manager.find(item)) {
                return 'text-primary'
            }
            return ''
        },
    },
})
</script>

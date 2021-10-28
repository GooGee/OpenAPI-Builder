<template>
    <div>
        <span v-for="item in list" :key="item" @click="$emit('update:color', item)">
            <ColorButton :color="item" :active="item === color"></ColorButton>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColorButton from '../button/ColorButton.vue'

export default defineComponent({
    components: {
        ColorButton,
    },
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        return {
            list: [
                '',
                '#f00',
                '#f0f',
                '#f80',
                '#ff0',
                '#0f0',
                '#0ff',
                '#00f',
                '#08f',
                '#80f',
            ],
        }
    },
})
</script>

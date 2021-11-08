<template>
    <div>
        <span v-for="item in colorxx" :key="item" @click="$emit('update:color', item)">
            <ColorButton :color="item" :active="item === color"></ColorButton>
        </span>
    </div>
</template>

<script lang="ts">
import { colorxx } from '@/model/Entity/ColorEnum'
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
            colorxx,
        }
    },
})
</script>

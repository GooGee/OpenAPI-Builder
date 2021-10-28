<template>
    <span
        :style="{ 'background-color': bg, 'border-color': border }"
        :class="{ active: active }"
        class="color-button"
    ></span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: {
        color: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(props, context) {
        const bg = computed(function () {
            if (props.color === '') {
                return '#fff'
            }
            if (props.active) {
                return props.color
            }
            return '#fff'
        })
        const border = computed(function () {
            if (props.color === '') {
                return '#333'
            }
            return props.color
        })
        return {
            bg,
            border,
        }
    },
})
</script>

<style>
.color-button {
    display: inline-block;
    border-radius: 50%;
    border-style: solid;
    border-width: 4px;
    cursor: pointer;
    width: 33px;
    height: 33px;
    margin: 3px;
    opacity: 0.2;
}

.color-button.active {
    opacity: 1;
}
</style>

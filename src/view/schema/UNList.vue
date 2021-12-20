<template>
    <div v-for="item in list" :key="item.ui" class="mb11">
        {{ getUN(item.un) }}
    </div>
</template>

<script lang="ts">
import UniqueItemInterface from '@/model/Entity/UniqueItemInterface'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        getUN: {
            type: Function,
            required: true,
        },
        list: {
            type: Object as PropType<UniqueItemInterface[]>,
            required: true,
        },
    },
})
</script>

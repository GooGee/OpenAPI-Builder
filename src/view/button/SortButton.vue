<template>
    <span @click="sort(true)" :class="ascending ? '' : 'c-lightgray'" class="pointer">
        ▲
    </span>
    <span @click="sort(false)" :class="ascending ? 'c-lightgray' : ''" class="pointer">
        ▼
    </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
    },
    setup(props, context) {
        const ascending = ref(true)
        function sort(asc: boolean) {
            ascending.value = asc
            props.manager.sort(ascending.value)
        }
        return { ascending, sort }
    },
})
</script>

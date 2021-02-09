<template>
    <span @click="clone" class="btn btn-outline-primary"> Clone </span>
</template>

<script lang="ts">
import UniqueItem from '@/model/Base/UniqueItem'
import UniqueItemManager from '@/model/Base/UniqueItemManager'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
    },
    methods: {
        clone() {
            const text = prompt('Please input the name', this.item.name + '1')
            if (text) {
                const one = this.manager.make(text)
                one.load(this.item)
                one.name = text
                this.manager.add(one)
            }
        },
    },
})
</script>

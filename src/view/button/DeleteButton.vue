<template>
    <span @click="remove" class="btn btn-outline-danger"> - </span>
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
        remove() {
            if (confirm('Are you sure?')) {
                this.manager.remove(this.item)
                this.$emit('deleted', this.item)
            }
        },
    },
})
</script>

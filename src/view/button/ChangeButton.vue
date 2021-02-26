<template>
    <span @click="change" class="btn btn-outline-primary"> {{ item.ui }} </span>
</template>

<script lang="ts">
import Noty from 'noty'
import UniqueItem from '@/model/Base/UniqueItem'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
    },
    methods: {
        change() {
            const item = this.item as UniqueItem
            const text = prompt('Please input the ui', item.ui)
            if (text) {
                try {
                    item.ui = text
                    this.$emit('changed', text)
                } catch (error) {
                    new Noty({
                        text: error.message,
                        theme: 'bootstrap-v4',
                        type: 'error',
                    }).show()
                }
            }
        },
    },
})
</script>

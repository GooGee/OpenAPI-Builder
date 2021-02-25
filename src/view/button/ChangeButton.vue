<template>
    <span @click="change" class="btn btn-outline-primary"> {{ item[name] }} </span>
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
        name: {
            type: String,
            required: false,
            default: 'ui',
        },
    },
    methods: {
        change() {
            const item = this.item as UniqueItem
            const name = this.name as keyof UniqueItem
            const text = prompt(`Please input the ${this.name}`, item[name] as string)
            if (text) {
                try {
                    item[name as 'ui'] = text
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

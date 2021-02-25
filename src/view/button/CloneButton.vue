<template>
    <span @click="clone" class="btn btn-outline-primary"> Clone </span>
</template>

<script lang="ts">
import Noty from 'noty'
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
            const text = prompt('Please input the name', this.item.ui + '1')
            if (text) {
                try {
                    const one = this.manager.make(text)
                    one.load(this.item)
                    one.ui = text
                    this.manager.add(one)
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

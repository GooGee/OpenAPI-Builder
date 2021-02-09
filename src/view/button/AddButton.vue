<template>
    <span @click="add" class="btn btn-outline-primary"> + </span>
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
        name: {
            type: String,
            required: false,
            default: 'name',
        },
        value: {
            type: String,
            required: false,
            default: 'name',
        },
    },
    methods: {
        add() {
            if (this.name) {
                const text = prompt(`Please input the ${this.name}`, this.value)
                if (text) {
                    this.make(text)
                }
            } else {
                this.make(new Date().toISOString() + Math.random())
            }
        },
        make(value: string) {
            try {
                const item = this.manager.make(value)
                if (this.name === '') {
                    item.name = value
                }
                this.manager.add(item)
            } catch (error) {
                alert(error.message)
            }
        },
    },
})
</script>

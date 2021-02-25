<template>
    <span @click="add" class="btn btn-outline-primary"> + </span>
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
        value: {
            type: String,
            required: false,
            default: 'name',
        },
        noinput: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        add() {
            if (this.noinput) {
                this.make(this.value)
                return
            }
            const text = prompt('Please input the ui', this.value)
            if (text) {
                this.make(text)
            }
        },
        make(value: string) {
            try {
                const item = this.manager.make(value)
                this.manager.add(item)
                this.$emit('added', item)
            } catch (error) {
                new Noty({
                    text: error.message,
                    theme: 'bootstrap-v4',
                    type: 'error',
                }).show()
            }
        },
    },
})
</script>

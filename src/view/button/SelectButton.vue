<template>
    <select v-model="item" @change="add" class="form-control wa">
        <option value="" disabled>----</option>
        <option v-for="item in list" :key="item.ui" :value="item">{{ item.ui }}</option>
    </select>
</template>

<script lang="ts">
import UniqueItem from '@/model/Base/UniqueItem'
import Noty from 'noty'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        list: {
            type: Array,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            item: '',
        }
    },
    methods: {
        add() {
            try {
                const selected = (this.item as any) as UniqueItem
                const item = this.manager.make(selected.ui)
                this.manager.add(item)
                this.item = ''
                this.$emit('select', selected, item)
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

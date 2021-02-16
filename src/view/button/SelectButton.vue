<template>
    <select v-model="item" @change="add($event.target.value)" class="form-control wa">
        <option value="" disabled>----</option>
        <option v-for="item in list" :key="item.ui" :value="item.ui">{{ item.ui }}</option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        list: {
            type: Array,
            required: true,
        },
        selected: {
            type: String,
            required: false,
            default: '',
        },
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            item: this.selected,
        }
    },
    methods: {
        add(ui: string) {
            try {
                const item = this.manager.make(ui)
                this.manager.add(item)
                this.$emit('select', ui)
                this.item = ''
            } catch (error) {
                alert(error)
            }
        },
    },
})
</script>

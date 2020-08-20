<template>
    <b-form-select v-model="selected" @change="add" :options="list" :value-field="name" :text-field="text" class="wa">
        <template v-slot:first>
            <b-form-select-option value="" disabled>----</b-form-select-option>
        </template>
    </b-form-select>
</template>

<script>
export default {
    name: 'SelectButton',
    props: {
        list: {
            type: Array,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: false,
        },
        callback: {
            type: Function,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            selected: '',
        }
    },
    methods: {
        add(name) {
            if (name) {
                try {
                    if (this.callback) {
                        const item = this.list.find(one => one.name === name)
                        this.callback(item, this.manager)
                    } else {
                        const item = this.manager.make(name)
                        this.manager.add(item)
                    }
                    this.selected = ''
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
        },
    },
}
</script>

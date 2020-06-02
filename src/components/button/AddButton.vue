<template>
    <b-button @click="add" variant="outline-primary"> + </b-button>
</template>

<script>
let index = 0

export default {
    name: 'AddButton',
    props: {
        manager: {
            type: Object,
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
            let value = ''
            if (this.name) {
                value = prompt(`Please input the ${this.name}`, this.value)
            } else {
                index += 1
                value = index
            }
            if (value) {
                try {
                    const item = this.manager.make(value)
                    this.manager.add(item)
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

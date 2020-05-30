<template>
    <b-button @click="add" variant="outline-primary"> + </b-button>
</template>

<script>
export default {
    name: 'AddButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    methods: {
        add() {
            const value = prompt(`Please input the ${this.name}`)
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

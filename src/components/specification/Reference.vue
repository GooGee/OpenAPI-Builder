<template>
    <b-button @click="show" variant="outline-primary">{{ reference.text }}</b-button>
</template>

<script>
import dialogue from '../../states/component.js'

export default {
    name: 'Reference',
    props: {
        reference: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        show() {
            const cb = ok => {
                try {
                    this.reference.type = dialogue.type
                    this.reference.name = dialogue.selected.name
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }

            if (this.type) {
                dialogue.type = this.type
                dialogue.showOnly(this.title, cb)
                return
            }
            dialogue.show(this.title, cb)
        },
    },
}
</script>

<template>
    <b-button @click="show" :variant="reference.name ? 'outline-primary' : 'outline-danger'">
        {{ reference.name + ' @ ' + reference.type }}
    </b-button>
</template>

<script>
import dialogue from '../../states/dialogue.js'

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
            default: 'schemas',
        },
    },
    methods: {
        show() {
            const cb = ok => {
                try {
                    this.reference.type = dialogue.component.type
                    this.reference.name = dialogue.component.selected.name
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
                dialogue.component.type = this.type
                dialogue.component.showOnly(this.type, cb)
                return
            }
            dialogue.component.show(this.type, cb)
        },
    },
}
</script>

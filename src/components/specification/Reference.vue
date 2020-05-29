<template>
    <b-button @click="show" variant="outline-primary">{{ reference.text }}</b-button>
</template>

<script>
import dialogue from '../../states/dialogue/component.js'

export default {
    name: 'Reference',
    props: {
        reference: {
            type: Object,
            required: true,
        },
    },
    methods: {
        show() {
            dialogue.show('', ok => {
                this.reference.type = dialogue.type
                this.reference.name = dialogue.selected.name
            })
        },
    },
}
</script>

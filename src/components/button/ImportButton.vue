<template>
    <b-button @click="show" variant="outline-primary"> ++ </b-button>
</template>

<script>
import dialogue from '../../states/dialogue.js'

export default {
    name: 'ImportButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: false,
            default: 'Schema',
        },
    },
    methods: {
        show() {
            dialogue.json.itemName = this.name
            dialogue.json.show('', text => {
                try {
                    const list = JSON.parse(text)
                    if (Array.isArray(list)) {
                        list.forEach(item => {
                            let found = this.manager.find(item.name)
                            if (found) {
                                // skip
                            } else {
                                found = this.manager.make(item.name)
                                this.manager.add(found)
                                found.load(item)
                            }
                        })
                        return
                    }
                    throw new Error('JSON must be an Array')
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            })
        },
    },
}
</script>

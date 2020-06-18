<template>
    <b-button @click="show" variant="outline-primary"> Import </b-button>
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
    },
    methods: {
        show() {
            dialogue.json.show('', text => {
                try {
                    const list = JSON.parse(text)
                    if (Array.isArray(list)) {
                        list.forEach(item => {
                            let found = this.manager.find(item.name)
                            if (found) {
                                // ok
                            } else {
                                found = this.manager.make(item.name)
                                this.manager.add(found)
                            }
                            found.load(item)
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

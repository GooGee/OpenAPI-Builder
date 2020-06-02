<template>
    <table class="table">
        <tbody>
            <Schema
                v-for="schema in manager.list"
                :schema="schema"
                :manager="manager"
                :type="type"
                :key="schema.name"
            ></Schema>
        </tbody>
        <tfoot v-if="editing">
            <tr>
                <td>
                    <b-button-group v-if="type === 'object'">
                        <AddButton :manager="manager" name="name"></AddButton>
                        <b-button @click="show" variant="outline-primary"> Input </b-button>
                    </b-button-group>
                    <AddButton v-else :manager="manager" name=""></AddButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import dialogue from '../../states/dialogue.js'

export default {
    name: 'SchemaList',
    components: { AddButton },
    beforeCreate() {
        this.$options.components.Schema = require('./Schema').default
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        editing: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: 'object',
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

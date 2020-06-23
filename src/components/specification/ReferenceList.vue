<template>
    <div>
        <div>
            <slot></slot>
            <b-button @click="show" variant="outline-primary"> + </b-button>
        </div>
        <div v-for="item in manager.list" :key="item.name" class="mtb11">
            <b-button-group>
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <Reference :reference="item" :type="type"></Reference>
            </b-button-group>
        </div>
    </div>
</template>

<script>
import dialogue from '../../states/dialogue.js'
import AddButton from '../button/AddButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from './Reference.vue'

export default {
    name: 'ReferenceList',
    components: {
        AddButton,
        DeleteButton,
        Reference,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: '',
        },
    },
    methods: {
        show() {
            const cb = ok => {
                try {
                    const item = this.manager.make(dialogue.component.selected.name, dialogue.component.type)
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

<template>
    <div>
        <div>
            <h2 class="inline mr11px">{{ title }}</h2>
            <b-button @click="show" variant="outline-primary"> + </b-button>
        </div>
        <br />
        <div v-for="item in manager.list" :key="item.name" class="mtb11px">
            <b-button-group>
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <Reference :reference="item" :type="type" :title="title"></Reference>
            </b-button-group>
        </div>
    </div>
</template>

<script>
import dialogue from '../../states/component.js'
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
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        show() {
            const cb = ok => {
                try {
                    const property = this.manager.make(dialogue.selected.name, dialogue.type)
                    this.manager.add(property)
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

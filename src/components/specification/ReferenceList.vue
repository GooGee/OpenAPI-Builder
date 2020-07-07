<template>
    <div>
        <div>
            <slot></slot>
            <b-button @click="show" variant="outline-primary"> + </b-button>
        </div>
        <EditList :manager="manager" :withadd="false" :withedit="false"></EditList>
    </div>
</template>

<script>
import dialogue from '../../states/dialogue.js'
import AddButton from '../button/AddButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import EditList from '../EditList.vue'
import Reference from './Reference.vue'

export default {
    name: 'ReferenceList',
    components: {
        AddButton,
        DeleteButton,
        EditList,
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

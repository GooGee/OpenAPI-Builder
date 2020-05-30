<template>
    <div>
        <div>
            <h2 class="inline mr11">Tag</h2>
            <b-button @click="show" variant="outline-primary"> + </b-button>
        </div>
        <div v-for="item in manager.list" :key="item.name" class="mtb11">
            <DeleteButton :manager="manager" :item="item">{{ item.name }}</DeleteButton>
        </div>
    </div>
</template>

<script>
import builder from '../../states/builder.js'
import dialogue from '../../states/list.js'
import AddButton from '../button/AddButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default {
    name: 'TagList',
    components: {
        AddButton,
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    methods: {
        show() {
            dialogue.showList(builder.document.tagManager.list, 'Tag', ok => {
                try {
                    const item = this.manager.make(dialogue.selected.name)
                    this.manager.add(property)
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

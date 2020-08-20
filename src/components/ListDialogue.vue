<template>
    <b-modal v-model="dialogue.list.visible" :title="dialogue.list.title" hide-footer>
        <div class="mtb11">
            <b-form-input v-model="dialogue.list.keyword" placeholder="Search" autofocus></b-form-input>
        </div>

        <b-list-group>
            <b-list-group-item v-if="dialogue.list.showBlank" @click="select(null)" button> ---- </b-list-group-item>
            <b-list-group-item @click="select(item)" v-for="item in dialogue.list.filtered" :key="item.name" button>
                {{ item.name }}
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import dialogue from '../states/dialogue.js'

export default {
    name: 'ListDialogue',
    data() {
        return {
            dialogue,
        }
    },
    methods: {
        select(item) {
            dialogue.list.hide()
            dialogue.list.select(item)
        },
    },
}
</script>

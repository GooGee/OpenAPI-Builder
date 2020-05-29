<template>
    <b-modal v-model="dialogue.visible" :title="dialogue.title" hide-footer>
        <div class="mtb11px">
            <b-form-input v-model="dialogue.keyword" placeholder="Search" autofocus></b-form-input>
        </div>

        <b-list-group>
            <b-list-group-item v-if="dialogue.showBlank" @click="select(null)" button> ---- </b-list-group-item>
            <b-list-group-item @click="select(item)" v-for="item in dialogue.filtered" :key="item.name" button>
                {{ item.name }}
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import dialogue from '../states/list.js'

export default {
    name: 'ListDialogue',
    data() {
        return {
            dialogue,
        }
    },
    methods: {
        select(item) {
            dialogue.hide()
            dialogue.select(item)
        },
    },
}
</script>

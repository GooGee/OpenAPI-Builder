<template>
    <b-modal @ok="ok" v-model="dialogue.json.visible" size="xl">
        <template v-slot:modal-header>
            <div>
                Paste JSON: Array of
                <a target="_blank" :href="dialogue.json.url"> {{ dialogue.json.itemName }} </a>
            </div>
            <a target="_blank" href="https://shancarter.github.io/mr-data-converter/">Tool</a>
        </template>
        <textarea v-model="dialogue.json.text" class="form-control" spellcheck="false" rows="11"></textarea>
    </b-modal>
</template>

<script>
import dialogue from '../states/dialogue.js'

export default {
    name: 'JSONDialogue',
    data() {
        return {
            dialogue,
        }
    },
    methods: {
        ok() {
            dialogue.json.hide()
            dialogue.json.ok()
        },
    },
}
</script>

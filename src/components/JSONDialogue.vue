<template>
    <b-modal @ok="ok" v-model="dialogue.json.visible" size="xl">
        <template v-slot:modal-header>
            <div>
                Paste JSON here
                <a target="_blank" href="https://shancarter.github.io/mr-data-converter/">Tool</a>
            </div>
        </template>
        <textarea v-model="dialogue.json.text" class="form-control" spellcheck="false" rows="11"></textarea>
        <div>Example: <pre>[{"name":"xxx"}]</pre></div>
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

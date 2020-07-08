<template>
    <div>
        <div class="mtb11">
            <h2 class="inline mr11">Script</h2>
            <b-button @click="run" variant="outline-primary"> Run </b-button>
        </div>
        <div class="mb11">
            <a target="_blank" :href="url" class="mr11"> {{ item }} </a>
            <a target="_blank" href="https://googee.github.io/OpenAPI/docs/classes/document.html"> Document </a>
        </div>
        <textarea v-model="document[name]" class="form-control" spellcheck="false" rows="22"></textarea>
    </div>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'Script',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        item: {
            type: String,
            required: true,
        },
    },
    computed: {
        url() {
            return `https://googee.github.io/OpenAPI/docs/classes/${this.item}manager.html`
        },
    },
    data() {
        return {
            document: builder.document,
        }
    },
    methods: {
        run() {
            try {
                const fff = new Function('return ' + this.document[this.name])()
                fff(this.manager, this.document)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>

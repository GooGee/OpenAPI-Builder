<template>
    <div class="mtb11">
        <h2 class="inline mr11">Script</h2>
        <b-button @click="run" variant="outline-primary"> Run </b-button>
        <br />
        <br />
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

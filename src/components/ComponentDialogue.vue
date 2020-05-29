<template>
    <b-modal v-if="builder.document" v-model="dialogue.visible" title="Component" size="xl" hide-footer>
        <b-form-radio-group
            v-if="!dialogue.single"
            v-model="dialogue.type"
            :options="typeList"
            buttons
            button-variant="outline-primary"
        ></b-form-radio-group>

        <div class="mtb11px">
            <b-form-input v-model="dialogue.keyword" placeholder="Search" autofocus></b-form-input>
        </div>

        <b-list-group>
            <b-list-group-item @click="select(item)" v-for="item in dialogue.filtered" :key="item.name" button>
                {{ item.name }}
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import builder from '../states/builder.js'
import dialogue from '../states/component.js'

export default {
    name: 'ComponentDialogue',
    data() {
        return {
            builder,
            dialogue,
            typeList: [
                'callbacks',
                'examples',
                'headers',
                'links',
                'parameters',
                'requestBodies',
                'responses',
                'schemas',
                'securitySchemes',
            ],
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

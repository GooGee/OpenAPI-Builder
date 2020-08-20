<template>
    <b-modal v-model="dialogue.component.visible" :title="dialogue.component.title" size="xl" hide-footer>
        <b-form-radio-group
            v-if="!dialogue.component.single"
            v-model="dialogue.component.type"
            :options="typeList"
            buttons
            button-variant="outline-primary"
        ></b-form-radio-group>

        <div class="mtb11">
            <b-form-input v-model="dialogue.component.keyword" placeholder="Search" autofocus></b-form-input>
        </div>

        <b-list-group>
            <b-list-group-item
                @click="select(item)"
                v-for="item in dialogue.component.filtered"
                :key="item.name"
                button
            >
                {{ item.name }}
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import dialogue from '../states/dialogue.js'

export default {
    name: 'ComponentDialogue',
    data() {
        return {
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
            dialogue.component.hide()
            dialogue.component.select(item)
        },
    },
}
</script>

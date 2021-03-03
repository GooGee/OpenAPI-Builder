<template>
    <div>
        <ArrayLabel v-model:isArray="schema.isArray" class="mr11"></ArrayLabel>

        <select v-model="schema.type" class="form-control inline wa mr11">
            <option v-for="type in typexx" :value="type" :key="type">
                {{ type }}
            </option>
        </select>

        <Reference v-if="schema.type === 'reference'" :reference="schema.reference"></Reference>

        <textarea
            v-if="schema.type === 'template'"
            v-model="schema.text"
            class="form-control inline wa"
            style="vertical-align: top;"
            spellcheck="false"
            rows="3"
        ></textarea>

        <select
            v-if="list.includes(schema.type)"
            v-model="schema.format"
            class="form-control inline wa"
        >
            <option value="">----</option>
            <option v-for="format in formatxx" :value="format.ui" :key="format.ui">
                {{ format.ui }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ArrayLabel from '../oapi/ArrayLabel.vue'
import Reference from '../oapi/Reference.vue'
import Property from '@/model/Data/Property'

export default defineComponent({
    components: {
        ArrayLabel,
        Reference,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
    created() {
        if (sss.project) {
            const found = sss.project.getPreset('DataFormat')
            if (found) {
                this.formatxx = found.propertyManager.list
            }
            this.typexx = sss.project.oapi.simpleTypeList
        }
    },
    data() {
        return {
            list: ['integer', 'number', 'string'],
            formatxx: [] as Property[],
            typexx: [] as string[],
        }
    },
})
</script>

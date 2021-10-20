<template>
    <div>
        <label class="mr11">
            <input v-model="schema.isArray" type="checkbox" />
            <span :class="{ 'text-secondary': !schema.isArray }"> Array</span>
        </label>

        <select v-model="schema.type" class="form-control inline wa mr11">
            <option v-for="type in typexx" :value="type" :key="type">
                {{ type }}
            </option>
        </select>

        <Reference
            v-if="schema.type === 'reference'"
            :reference="schema.reference"
        ></Reference>

        <textarea
            v-if="schema.type === 'template'"
            v-model="schema.text"
            class="form-control inline wa"
            style="vertical-align: top; width: 444px"
            spellcheck="false"
            wrap="off"
            rows="5"
        ></textarea>

        <select
            v-if="list.includes(schema.type)"
            v-model="schema.format"
            class="form-control inline wa"
        >
            <option value="">----</option>
            <option v-for="format in formatxx" :value="format.un" :key="format.id">
                {{ format.un }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { simpleTypeList } from '@/model/OAPI/DataType'
import SchemaSimple from '@/model/OAPI/SchemaSimple'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'

export default defineComponent({
    components: {
        Reference,
    },
    props: {
        schema: {
            type: Object as PropType<SchemaSimple>,
            required: true,
        },
    },
    setup(props, context) {
        const formatxx = ss.project.getPreset('DataFormat')?.propertyManager.list ?? []
        const typexx = simpleTypeList
        return {
            list: ['integer', 'number', 'string'],
            formatxx,
            typexx,
        }
    },
})
</script>

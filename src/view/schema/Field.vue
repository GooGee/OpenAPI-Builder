<template>
    <div class="form-inline">
        <label class="mr11">
            <input v-model="schema.isArray" type="checkbox" class="mr3" />
            <span :class="{ 'text-secondary': !schema.isArray }"> Array</span>
        </label>

        <select v-model="schema.type" class="form-control mr11">
            <option v-for="type in typexx" :value="type" :key="type">
                {{ type }}
            </option>
        </select>

        <Reference
            v-if="schema.type === 'reference'"
            :reference="schema.reference"
            :withBlank="false"
        ></Reference>

        <textarea
            v-if="schema.type === 'template'"
            v-model="schema.text"
            class="form-control"
            style="vertical-align: top; width: 444px"
            spellcheck="false"
            wrap="off"
            rows="5"
        ></textarea>

        <select
            v-if="list.includes(schema.type)"
            v-model="schema.format"
            class="form-control"
        >
            <option value="">----</option>
            <option v-for="format in formatxx" :value="format.un" :key="format.ui">
                {{ format.un }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { dataTypeList } from '@/model/OAPI/DataType'
import SchemaField from '@/model/OAPI/SchemaField'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'

export default defineComponent({
    components: {
        Reference,
    },
    props: {
        schema: {
            type: Object as PropType<SchemaField>,
            required: true,
        },
    },
    setup(props, context) {
        const formatxx = ss.project.getPreset('DataFormat')?.propertyManager.list ?? []
        const typexx = dataTypeList
        return {
            list: ['integer', 'number', 'string'],
            formatxx,
            typexx,
        }
    },
})
</script>

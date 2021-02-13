<template>
    <div>
        <div>
            <ArrayLabel v-model:isArray="schema.isArray" class="mr11"></ArrayLabel>

            <select v-model="schema.type" class="form-control inline wa">
                <option v-for="type in typexx" :value="type" :key="type">
                    {{ type }}
                </option>
            </select>
        </div>
        <div>
            <SchemaObject
                v-if="schema.type === 'object'"
                :manager="schema.schemaManager"
            ></SchemaObject>
            <SchemaComposition v-else :manager="schema.schemaManager"></SchemaComposition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ArrayLabel from '../oapi/ArrayLabel.vue'
import SchemaComposition from './SchemaComposition.vue'
import SchemaObject from './SchemaObject.vue'

export default defineComponent({
    components: {
        ArrayLabel,
        SchemaComposition,
        SchemaObject,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
    computed: {
        typexx(): string[] {
            if (this.schema.schemaManager.list.length === 0) {
                return this.all
            }

            if (this.schema.type === 'object') {
                return this.one
            }
            return this.other
        },
    },
    data() {
        return {
            all: sss.getProject().oapi.complexTypeList,
            one: [] as string[],
            other: [] as string[],
        }
    },
    created() {
        const found = this.all.find(item => item === 'object')!
        this.one.push(found)
        this.other = this.all.slice()
        const index = this.other.indexOf(found)
        this.other.splice(index, 1)
    },
})
</script>

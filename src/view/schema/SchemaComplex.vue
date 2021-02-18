<template>
    <div>
        <div class="mtb11">
            <select v-model="sss.sidebar.item.type" class="form-control inline wa">
                <option v-for="type in typexx" :value="type" :key="type">
                    {{ type }}
                </option>
            </select>
        </div>
        <div>
            <SchemaObject
                v-if="sss.sidebar.item.type === 'object'"
                :manager="sss.sidebar.item.schemaManager"
            ></SchemaObject>
            <SchemaComposition v-else :manager="sss.sidebar.item.schemaManager"></SchemaComposition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import SchemaComposition from './SchemaComposition.vue'
import SchemaObject from './SchemaObject.vue'
import SchemaComplex from '@/model/OAPI/SchemaComplex'

export default defineComponent({
    components: {
        SchemaComposition,
        SchemaObject,
    },
    computed: {
        typexx(): string[] {
            const schema = sss.sidebar.item as SchemaComplex
            if (schema.schemaManager.list.length === 0) {
                return this.all
            }

            if (schema.type === 'object') {
                return this.one
            }
            return this.other
        },
    },
    data() {
        return {
            sss,
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

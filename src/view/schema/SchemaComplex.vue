<template>
    <div :class="{ 'text-secondary': sss.sidebar.item.empty === false }" class="mtb11">
        <label v-for="item in stypexx" :key="item" class="mr11">
            <input
                type="radio"
                v-model="sss.sidebar.item.type"
                :value="item"
                :disabled="sss.sidebar.item.empty === false"
            />
            {{ item }}
        </label>

        <select
            v-if="sss.sidebar.item.isComposition"
            v-model="sss.sidebar.item.composition.type"
            class="form-control inline wa"
        >
            <option v-for="type in dtypexx" :value="type" :key="type">
                {{ type }}
            </option>
        </select>
    </div>

    <textarea
        v-if="sss.sidebar.item.isTemplate"
        v-model="sss.sidebar.item.text"
        class="form-control"
        spellcheck="false"
        wrap="off"
        rows="11"
    ></textarea>
    <SchemaObject
        v-if="sss.sidebar.item.isObject"
        :manager="sss.sidebar.item.object.schemaManager"
    ></SchemaObject>
    <SchemaComposition
        v-if="sss.sidebar.item.isComposition"
        :manager="sss.sidebar.item.composition.schemaManager"
        :ui="sss.sidebar.item.ui"
    ></SchemaComposition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { compositionTypeList } from '@/model/OAPI/DataType'
import { schemaTypeList } from '@/model/OAPI/SchemaComplex'
import SchemaComposition from './SchemaComposition.vue'
import SchemaObject from './SchemaObject.vue'

export default defineComponent({
    components: {
        SchemaComposition,
        SchemaObject,
    },
    data() {
        return {
            sss,
            dtypexx: compositionTypeList,
            stypexx: schemaTypeList,
        }
    },
})
</script>

<template>
    <div class="mtb11">
        <label
            :class="{ 'text-secondary': sss.sidebar.item.composition.schemaManager.list.length }"
            class="mr11"
        >
            <input
                type="radio"
                v-model="sss.sidebar.item.isObject"
                :value="true"
                :disabled="sss.sidebar.item.composition.schemaManager.list.length"
            />
            object
        </label>
        <label
            :class="{ 'text-secondary': sss.sidebar.item.object.schemaManager.list.length }"
            class="mr11"
        >
            <input
                type="radio"
                v-model="sss.sidebar.item.isObject"
                :value="false"
                :disabled="sss.sidebar.item.object.schemaManager.list.length"
            />
            composition
        </label>
        <select
            v-if="sss.sidebar.item.isObject === false"
            v-model="sss.sidebar.item.composition.type"
            class="form-control inline wa"
        >
            <option v-for="type in typexx" :value="type" :key="type">
                {{ type }}
            </option>
        </select>
    </div>

    <SchemaObject
        v-if="sss.sidebar.item.isObject"
        :manager="sss.sidebar.item.object.schemaManager"
    ></SchemaObject>
    <SchemaComposition
        v-else
        :manager="sss.sidebar.item.composition.schemaManager"
        :ui="sss.sidebar.item.ui"
    ></SchemaComposition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compositionTypeList } from '@/model/OAPI/DataType'
import sss from '@/sss.ts'
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
            typexx: compositionTypeList,
        }
    },
})
</script>

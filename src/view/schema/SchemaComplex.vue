<template>
    <div :class="{ 'text-secondary': sidebar.item.empty === false }" class="mtb11">
        <label v-for="item in stypexx" :key="item" class="mr11">
            <input
                type="radio"
                v-model="sidebar.item.type"
                :value="item"
                :disabled="sidebar.item.empty === false"
            />
            {{ item }}
        </label>

        <select
            v-if="sidebar.item.isComposition"
            v-model="sidebar.item.composition.type"
            class="form-control inline wa"
        >
            <option v-for="type in dtypexx" :value="type" :key="type">
                {{ type }}
            </option>
        </select>
    </div>

    <textarea
        v-if="sidebar.item.isTemplate"
        v-model="sidebar.item.text"
        class="form-control"
        spellcheck="false"
        wrap="off"
        rows="11"
    ></textarea>

    <SchemaObject
        v-if="sidebar.item.isObject"
        :manager="sidebar.item.object.schemaManager"
    ></SchemaObject>

    <SchemaComposition
        v-if="sidebar.item.isComposition"
        :manager="sidebar.item.composition.schemaManager"
        :un="sidebar.item.un"
    ></SchemaComposition>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { compositionTypeList } from '@/model/OAPI/DataType'
import { schemaTypeList } from '@/model/OAPI/SchemaComplex'
import { defineComponent, inject } from 'vue'
import SchemaComposition from './SchemaComposition.vue'
import SchemaObject from './SchemaObject.vue'

export default defineComponent({
    components: {
        SchemaComposition,
        SchemaObject,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar
        return {
            dtypexx: compositionTypeList,
            stypexx: schemaTypeList,
            sidebar,
        }
    },
})
</script>

<template>
    <div :class="{ 'text-secondary': sidebar.item.empty === false }" class="mtb11">
        <label class="mr11">
            <input
                type="radio"
                v-model="sidebar.item.isTemplate"
                :value="true"
                :disabled="sidebar.item.empty === false"
            />
            template
        </label>
        <label class="mr11">
            <input
                type="radio"
                v-model="sidebar.item.isTemplate"
                :value="false"
                :disabled="sidebar.item.empty === false"
            />
            composition
        </label>

        <select
            v-model="sidebar.item.composition.type"
            :disabled="sidebar.item.isTemplate"
            class="form-control inline wa"
        >
            <option v-for="type in typexx" :value="type" :key="type">
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

    <template v-else>
        <SchemaObject :manager="sidebar.item.object.fieldManager"></SchemaObject>

        <SchemaComposition
            :manager="sidebar.item.composition.referenceManager"
            :un="sidebar.item.un"
        ></SchemaComposition>
    </template>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { compositionTypeList } from '@/model/OAPI/DataType'
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
            typexx: compositionTypeList,
            sidebar,
        }
    },
})
</script>

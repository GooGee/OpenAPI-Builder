<template>
    <div :class="{ 'text-secondary': empty() === false }" class="mtb11">
        <label class="mr11">
            <input
                type="radio"
                v-model="sidebar.item.isTemplate"
                :value="true"
                :disabled="empty() === false"
            />
            template
        </label>
        <label class="mr11">
            <input
                type="radio"
                v-model="sidebar.item.isTemplate"
                :value="false"
                :disabled="empty() === false"
            />
            composition
        </label>

        <select
            v-model="sidebar.item.compositionType"
            :disabled="sidebar.item.isTemplate"
            class="form-control inline wa"
        >
            <option v-for="item in typexx" :value="item" :key="item">
                {{ item }}
            </option>
        </select>

        <div v-if="sidebar.item.isComposition">
            <ReferenceList :manager="sidebar.item.referenceManager"></ReferenceList>
        </div>
    </div>

    <JSONText
        v-if="sidebar.item.isTemplate"
        :item="sidebar.item.text"
        title="template"
    ></JSONText>

    <FieldList v-else :ui="sidebar.item.ui"></FieldList>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import Schema, { compositionTypeList } from '@/model/OAPI/Schema'
import ss from '@/ss'
import { defineComponent, inject } from 'vue'
import JSONText from '../oapi/JSONText.vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import FieldList from './FieldList.vue'

export default defineComponent({
    components: {
        FieldList,
        JSONText,
        ReferenceList,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<Schema>
        const manager = ss.project.oapi.fieldManager
        function empty() {
            if (manager.list.find((aa) => aa.schemaUI === sidebar.item!.ui)) {
                return false
            }
            return (
                sidebar.item!.referenceManager.list.length === 0 &&
                sidebar.item!.text.text === '{}'
            )
        }

        return {
            empty,
            sidebar,
            typexx: compositionTypeList,
        }
    },
})
</script>

<template>
    <PropertyTable v-if="sss.sidebar.item" :sidebar="sss.sidebar">
        <tr v-if="isParameter">
            <td class="text-right">name</td>
            <td>
                <input type="text" class="form-control" v-model="sss.sidebar.item.name" />
            </td>
        </tr>
        <tr v-if="isParameter">
            <td class="text-right">in</td>
            <td>
                <select v-model="sss.sidebar.item.location" class="form-control wa">
                    <option v-for="item in locationxx" :value="item" :key="item">
                        {{ item }}
                    </option>
                </select>
            </td>
        </tr>
        <tr>
            <td class="text-right">schema</td>
            <td>
                <SchemaSimple :schema="sss.sidebar.item.schema"></SchemaSimple>
            </td>
        </tr>
        <tr>
            <td class="text-right">allowEmptyValue</td>
            <td>
                <span class="custom-control custom-switch">
                    <input
                        id="allowEmptyValue"
                        v-model="sss.sidebar.item.allowEmptyValue"
                        type="checkbox"
                        class="custom-control-input"
                    />
                    <label for="allowEmptyValue" class="custom-control-label"></label>
                </span>
            </td>
        </tr>
        <tr>
            <td class="text-right">deprecated</td>
            <td>
                <span class="custom-control custom-switch">
                    <input
                        id="deprecated"
                        v-model="sss.sidebar.item.deprecated"
                        type="checkbox"
                        class="custom-control-input"
                    />
                    <label for="deprecated" class="custom-control-label"></label>
                </span>
            </td>
        </tr>
        <tr>
            <td class="text-right">required</td>
            <td>
                <span class="custom-control custom-switch">
                    <input
                        id="required"
                        v-model="sss.sidebar.item.required"
                        type="checkbox"
                        class="custom-control-input"
                    />
                    <label for="required" class="custom-control-label"></label>
                </span>
            </td>
        </tr>
        <tr>
            <td class="text-right">example</td>
            <td>
                <textarea
                    v-model="sss.sidebar.item.example"
                    class="form-control"
                    spellcheck="false"
                    rows="3"
                ></textarea>
            </td>
        </tr>
    </PropertyTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PropertyTable from './PropertyTable.vue'
import SchemaSimple from '../schema/SchemaSimple.vue'
import sss from '@/sss.ts'

export default defineComponent({
    components: {
        PropertyTable,
        SchemaSimple,
    },
    props: {
        isParameter: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            sss,
            locationxx: ['cookie', 'path', 'query'],
        }
    },
})
</script>

<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="sidebar.item.description"
                    />
                </td>
            </tr>
            <tr v-if="!isHeader">
                <td class="text-right">name</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="sidebar.item.name"
                    />
                </td>
            </tr>
            <tr v-if="!isHeader">
                <td class="text-right">in</td>
                <td>
                    <select v-model="sidebar.item.location" class="form-control wa">
                        <option v-for="item in locationxx" :value="item" :key="item">
                            {{ item }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="text-right">schema</td>
                <td>
                    <SchemaSimple :schema="sidebar.item.schema"></SchemaSimple>
                </td>
            </tr>
            <tr>
                <td class="text-right">allowEmptyValue</td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="allowEmptyValue"
                            v-model="sidebar.item.allowEmptyValue"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            for="allowEmptyValue"
                            class="custom-control-label"
                        ></label>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="text-right">deprecated</td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="deprecated"
                            v-model="sidebar.item.deprecated"
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
                            v-model="sidebar.item.required"
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
                        v-model="sidebar.item.example"
                        class="form-control"
                        spellcheck="false"
                        rows="3"
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, PropType } from 'vue'
import SchemaSimple from '../schema/SchemaSimple.vue'

export default defineComponent({
    components: {
        SchemaSimple,
    },
    props: {
        isHeader: {
            type: Boolean,
            required: false,
            default: false,
        },
        sidebar: {
            type: Object as PropType<SideBar>,
            required: true,
        },
    },
    setup(props, context) {
        return { locationxx: ['cookie', 'path', 'query'] }
    },
})
</script>

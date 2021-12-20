<template>
    <table class="table">
        <caption class="caption-top">
            <h2>{{ path.un }}</h2>
        </caption>
        <tbody>
            <tr>
                <td class="text-right w111">path</td>
                <td>{{ getUN(path.unPattern) }}</td>
            </tr>
            <tr>
                <td class="text-right">parameter</td>
                <td>
                    <UNList :getUN="getUN" :list="path.parameterManager.list"></UNList>
                </td>
            </tr>
            <tr>
                <td class="text-right">operation</td>
                <td>{{ path.operation.un }}</td>
            </tr>
            <tr>
                <td class="text-right">parameter</td>
                <td>
                    <UNList
                        :getUN="getUN"
                        :list="path.operation.parameterManager.list"
                    ></UNList>
                </td>
            </tr>
            <tr>
                <td class="text-right">tag</td>
                <td>
                    <UNList
                        :getUN="getUN"
                        :list="path.operation.tagManager.list"
                    ></UNList>
                </td>
            </tr>
            <tr>
                <td class="text-right">RequestBody</td>
                <td>
                    <Response
                        v-if="path.operation.requestBody.unPattern"
                        :getUN="getUN"
                        :item="path.operation.requestBody"
                    ></Response>
                </td>
            </tr>
            <tr v-for="item in path.operation.statusManager.list" :key="item.ui">
                <td class="text-right">response</td>
                <td>
                    <Response :getUN="getUN" :item="item"></Response>
                </td>
            </tr>
            <tr>
                <td class="text-right">SecurityScheme</td>
                <td>{{ getUN(path.operation.security.un) }}</td>
            </tr>
            <tr>
                <td class="text-right">scope</td>
                <td>
                    <UNList
                        :getUN="getUN"
                        :list="path.operation.security.scopeManager.list"
                    ></UNList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
import Schema from '@/model/OAPI/Schema'
import Text from '@/model/Service/Text'
import { defineComponent, PropType } from 'vue'
import Response from './Response.vue'
import UNList from './UNList.vue'

export default defineComponent({
    components: {
        Response,
        UNList,
    },
    props: {
        path: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
        schema: {
            type: Object as PropType<Schema>,
            required: true,
        },
    },
    setup(props, context) {
        function getUN(unPattern: string) {
            return Text.runText(unPattern, {
                operation: props.path.operation,
                path: props.path,
                schema: props.schema,
            })
        }
        return {
            getUN,
        }
    },
})
</script>

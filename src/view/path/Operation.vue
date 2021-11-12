<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">un</td>
                <td>
                    <slot></slot>
                </td>
            </tr>
            <tr>
                <td class="text-right">summary</td>
                <td>
                    <input type="text" class="form-control" v-model="item.summary" />
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">deprecated</td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="deprecated"
                            v-model="item.deprecated"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label for="deprecated" class="custom-control-label"></label>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="text-right">parameters</td>
                <td>
                    <ReferenceList :manager="item.parameterManager"></ReferenceList>
                </td>
            </tr>
            <tr>
                <td class="text-right">requestBody</td>
                <td>
                    <Reference
                        :reference="item.requestBody"
                        type="requestBodies"
                    ></Reference>
                </td>
            </tr>
            <tr>
                <td class="text-right">responses</td>
                <td>
                    <StatusList :manager="item.statusManager"></StatusList>
                </td>
            </tr>
            <tr>
                <td class="text-right">callbacks</td>
                <td>
                    <CallBackList :manager="item.callbackManager"></CallBackList>
                </td>
            </tr>
            <tr>
                <td class="text-right">tags</td>
                <td>
                    <ReferenceList :manager="item.tagManager"></ReferenceList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Operation from '@/model/OAPI/Operation'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import CallBackList from './CallBackList.vue'
import StatusList from './StatusList.vue'

export default defineComponent({
    components: {
        CallBackList,
        Reference,
        ReferenceList,
        StatusList,
    },
    props: {
        item: {
            type: Object as PropType<Operation>,
            required: true,
        },
    },
})
</script>

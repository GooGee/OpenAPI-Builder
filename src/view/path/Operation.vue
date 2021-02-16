<template>
    <table class="table">
        <tbody>
            <tr>
                <td width="111px"></td>
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
                <td class="text-right" width="222px">description</td>
                <td>
                    <input type="text" class="form-control" v-model="item.description" />
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
                <td class="text-right">requestBody</td>
                <td>
                    <Reference :reference="item.requestBody" type="requestBodies"></Reference>
                </td>
            </tr>
            <tr>
                <td class="text-right">parameters</td>
                <td>
                    <ReferenceList
                        :manager="item.parameterManager"
                        type="parameters"
                    ></ReferenceList>
                </td>
            </tr>
            <tr>
                <td class="text-right">responses</td>
                <td>
                    <StatusList :manager="item.statusManager"></StatusList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Reference from '../oapi/Reference.vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import StatusList from './StatusList.vue'

export default defineComponent({
    components: {
        Reference,
        ReferenceList,
        StatusList,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
})
</script>

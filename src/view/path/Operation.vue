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
                    <ReferenceList
                        :manager="item.parameterManager"
                        type="parameters"
                    ></ReferenceList>
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
                <td class="text-right">tags</td>
                <td>
                    <EditList
                        :manager="item.tagManager"
                        :canAdd="false"
                        :canEdit="false"
                    ></EditList>
                    <span @click="select" class="btn btn-outline-primary"> + </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import UniqueItem from '@/model/Entity/UniqueItem'
import Operation from '@/model/OAPI/Operation'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import store from '@/store'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import EditList from '../part/EditList.vue'
import StatusList from './StatusList.vue'

export default defineComponent({
    components: {
        EditList,
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
    setup(props, context) {
        const listModal = store.listModal
        function select() {
            listModal.showList(
                ss.project.oapi.tagManager.list,
                'Select a Tag',
                function addTag(tag: UniqueItem) {
                    try {
                        const one = props.item.tagManager.make(tag.un)
                        props.item.tagManager.add(one)
                    } catch (error: any) {
                        Toast.error(error.message)
                    }
                },
            )
        }
        return { select }
    },
})
</script>

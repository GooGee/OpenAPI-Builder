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
                    <Reference :reference="item.requestBody" type="requestBodies"></Reference>
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
                    <SelectList @select="addTag" :list="tagxx" :title="title"> + </SelectList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Noty from 'noty'
import UniqueItem from '@/model/Base/UniqueItem'
import Operation from '@/model/OAPI/Operation'
import { defineComponent } from 'vue'
import EditList from '../oapi/EditList.vue'
import Reference from '../oapi/Reference.vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import SelectList from '../part/SelectList.vue'
import StatusList from './StatusList.vue'
import sss from '@/sss'

export default defineComponent({
    components: {
        EditList,
        Reference,
        ReferenceList,
        SelectList,
        StatusList,
    },
    props: {
        item: {
            type: Operation,
            required: true,
        },
    },
    data() {
        return {
            title: 'Select a Tag',
            tagxx: sss.getProject().oapi.tagManager.list,
        }
    },
    methods: {
        addTag(tag: UniqueItem) {
            try {
                const one = this.item.tagManager.make(tag.ui)
                this.item.tagManager.add(one)
            } catch (error) {
                new Noty({
                    text: error.message,
                    theme: 'bootstrap-v4',
                    type: 'error',
                }).show()
            }
        },
    },
})
</script>

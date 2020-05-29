<template>
    <div>
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
                        <b-form-input v-model="item.summary"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">description</td>
                    <td>
                        <b-form-input v-model="item.description"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">deprecated</td>
                    <td>
                        <b-form-radio-group v-model="item.deprecated">
                            <b-form-radio :value="true">true</b-form-radio>
                            <b-form-radio :value="false">false</b-form-radio>
                        </b-form-radio-group>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">requestBody</td>
                    <td>
                        <Reference :reference="item.requestBody" type="requestBodies" title="RequestBody"></Reference>
                    </td>
                </tr>
            </tbody>
        </table>

        <ReferenceList :manager="item.parameterManager" type="parameters" title="Parameter"></ReferenceList>

        <StatusList :manager="item.statusManager"></StatusList>

        <TagList :manager="item.tagManager"></TagList>
    </div>
</template>

<script>
import Reference from './Reference.vue'
import ReferenceList from './ReferenceList.vue'
import StatusList from './StatusList.vue'
import TagList from './TagList.vue'

export default {
    name: 'Operation',
    components: {
        Reference,
        ReferenceList,
        StatusList,
        TagList,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

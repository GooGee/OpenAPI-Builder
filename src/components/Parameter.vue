<template>
    <div class="row">
        <SideBar :manager="manager" title="Parameter" class="col-3"></SideBar>

        <div class="col-9">
            <table v-if="sidebar.item" class="table b-table">
                <tbody>
                    <tr>
                        <td width="111px"></td>
                        <td>
                            <b-button-group>
                                <DeleteButton :manager="manager" :item="sidebar.item"></DeleteButton>
                                <ChangeButton :item="sidebar.item" name="name"></ChangeButton>
                            </b-button-group>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">in</td>
                        <td>
                            <b-form-select v-model="sidebar.item.location" :options="locationList"></b-form-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">description</td>
                        <td>
                            <b-form-input v-model="sidebar.item.description"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">
                            type
                            <b-button v-if="editing" @click="editing = false" variant="outline-primary"> OK </b-button>
                        </td>
                        <td @click="editing = true">
                            <SchemaType :schema="sidebar.item.schema" :editing="editing"></SchemaType>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">allowEmptyValue</td>
                        <td>
                            <b-form-radio-group v-model="sidebar.item.allowEmptyValue">
                                <b-form-radio :value="true">true</b-form-radio>
                                <b-form-radio :value="false">false</b-form-radio>
                            </b-form-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">deprecated</td>
                        <td>
                            <b-form-radio-group v-model="sidebar.item.deprecated">
                                <b-form-radio :value="true">true</b-form-radio>
                                <b-form-radio :value="false">false</b-form-radio>
                            </b-form-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">required</td>
                        <td>
                            <b-form-radio-group v-model="sidebar.item.required">
                                <b-form-radio :value="true">true</b-form-radio>
                                <b-form-radio :value="false">false</b-form-radio>
                            </b-form-radio-group>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ChangeButton from './ChangeButton.vue'
import DeleteButton from './DeleteButton.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'
import SchemaType from './schema/SchemaType.vue'

export default {
    name: 'Parameter',
    components: {
        ChangeButton,
        DeleteButton,
        SchemaType,
        SideBar,
    },
    data() {
        return {
            sidebar,
            editing: false,
            manager: builder.document.component.parameterManager,
            locationList: ['cookie', 'header', 'path', 'query'],
        }
    },
}
</script>

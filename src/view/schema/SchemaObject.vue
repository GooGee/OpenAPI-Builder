<template>
    <table class="table">
        <thead>
            <tr>
                <th>ui</th>
                <th>type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :item="item"></ChangeButton>
                    </div>
                </td>
                <td>
                    <SchemaSimple :schema="item"></SchemaSimple>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <SelectButton
                        @select="addName"
                        :list="nameManager.list"
                        :manager="manager"
                    ></SelectButton>
                </td>
                <td>
                    <SelectButton
                        @select="addType"
                        :list="typexx"
                        :manager="manager"
                    ></SelectButton>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import Noty from 'noty'
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'
import SchemaSimple from './SchemaSimple.vue'
import Property from '@/model/Data/Property'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        SchemaSimple,
        SelectButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const nameManager = sss.getProject().getPreset('FieldName')!.propertyManager
        const typexx = ['boolean', 'integer', 'number', 'string'].map(item => {
            return {
                ui: item,
            }
        })

        class Schema {
            ui = ''
            type = ''
        }

        function addName(selected: Property, item: Schema) {
            item.type = selected.tag
        }

        function addType(selected: Record<string, any>, item: Schema) {
            item.type = item.ui
        }

        return {
            addName,
            addType,
            nameManager,
            typexx,
        }
    },
})
</script>

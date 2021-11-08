<template>
    <table class="table">
        <thead>
            <tr>
                <th>required / un</th>
                <th>type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in fieldxx" :key="item.ui">
                <td>
                    <span class="custom-control custom-switch inline">
                        <input
                            :id="'required' + item.ui"
                            v-model="item.required"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="'required' + item.ui"
                            class="custom-control-label"
                        ></label>
                    </span>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :manager="manager" :item="item"></ChangeButton>
                    </div>
                </td>
                <td>
                    <SchemaField :schema="item"></SchemaField>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <SelectButton
                        @select="addName"
                        :list="namexx"
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
import Property from '@/model/Entity/Property'
import UniqueItem from '@/model/Entity/UniqueItem'
import ss from '@/ss'
import { defineComponent, ref, watch } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'
import SchemaField from './SchemaField.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        SchemaField,
        SelectButton,
    },
    props: {
        ui: {
            type: Number,
            required: true,
        },
    },
    setup(props, context) {
        const manager = ss.project.oapi.fieldManager
        const fieldxx = ref<UniqueItem[]>(manager.findAll(props.ui))
        function update() {
            fieldxx.value = manager.findAll(props.ui)
        }
        watch(() => props.ui, update)

        const namexx = ss.project.getPreset('FieldName')!.propertyManager.list
        const typexx = ['boolean', 'integer', 'number', 'string'].map((item, index) => {
            return {
                ui: index + 1,
                un: item,
            }
        })

        class Schema {
            ui = 0
            schemaUI = 0
            un = ''
            type = ''
        }

        function addName(selected: Property, item: Schema) {
            item.type = selected.tag
            item.schemaUI = props.ui
            update()
        }

        function addType(selected: Record<string, any>, item: Schema) {
            item.type = item.un
            item.schemaUI = props.ui
            update()
        }

        return {
            addName,
            addType,
            fieldxx,
            manager,
            namexx,
            typexx,
        }
    },
})
</script>

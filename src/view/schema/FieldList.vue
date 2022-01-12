<template>
    <table class="table">
        <thead>
            <tr>
                <th>required / readOnly / writeOnly / un</th>
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
                    <span class="custom-control custom-switch inline">
                        <input
                            :id="'readOnly' + item.ui"
                            v-model="item.readOnly"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="'readOnly' + item.ui"
                            class="custom-control-label"
                        ></label>
                    </span>
                    <span class="custom-control custom-switch inline">
                        <input
                            :id="'writeOnly' + item.ui"
                            v-model="item.writeOnly"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="'writeOnly' + item.ui"
                            class="custom-control-label"
                        ></label>
                    </span>
                    <div class="btn-group">
                        <DeleteButton
                            @remove="update"
                            :manager="manager"
                            :item="item"
                        ></DeleteButton>
                        <ChangeButton :manager="manager" :item="item"></ChangeButton>
                    </div>
                </td>
                <td>
                    <Field :schema="item"></Field>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <FieldSelect
                        @select="update"
                        :list="namexx"
                        :manager="manager"
                        class="inline mr11"
                    ></FieldSelect>
                    <FieldSelect
                        @select="update"
                        :list="uixx"
                        :manager="manager"
                        class="inline"
                    ></FieldSelect>
                </td>
                <td>
                    <FieldSelect
                        @select="update"
                        :list="typexx"
                        :manager="manager"
                    ></FieldSelect>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { dataTypeList } from '@/model/OAPI/DataType'
import SchemaField from '@/model/OAPI/SchemaField'
import ss from '@/ss'
import { defineComponent, ref, watch } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Field from './Field.vue'
import FieldSelect from './FieldSelect.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        Field,
        FieldSelect,
    },
    props: {
        ui: {
            type: Number,
            required: true,
        },
    },
    setup(props, context) {
        const manager = ss.project.oapi.fieldManager
        const fieldxx = ref<SchemaField[]>([])
        const namexx = ref<SchemaField[]>([])
        const typexx = ref<SchemaField[]>([])
        const uixx = ref<SchemaField[]>([])

        function update() {
            fieldxx.value = manager.findAllField(props.ui)
            namexx.value = ss.project
                .getPreset('FieldName')!
                .propertyManager.list.map((item) =>
                    make(item.ui, item.un, item.tag),
                ) as SchemaField[]
            typexx.value = dataTypeList.map((item, index) =>
                make(index + 1, item, item),
            ) as SchemaField[]
            uixx.value = ss.schemaManager.list.map((item) =>
                make(item.ui, item.snakeCase + '_id', 'integer'),
            ) as SchemaField[]
        }
        watch(() => props.ui, update, { immediate: true })

        function make(ui: number, un: string, type: string) {
            return {
                ui,
                un,
                type,
                schemaUI: props.ui,
            }
        }

        return {
            fieldxx,
            manager,
            namexx,
            typexx,
            uixx,
            update,
        }
    },
})
</script>

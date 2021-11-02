<template>
    <table class="table">
        <thead>
            <tr>
                <th>required / un</th>
                <th>type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.id">
                <td>
                    <span class="custom-control custom-switch inline">
                        <input
                            :id="'required' + item.id"
                            v-model="item.required"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="'required' + item.id"
                            class="custom-control-label"
                        ></label>
                    </span>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :manager="manager" :item="item"></ChangeButton>
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
import Property from '@/model/Entity/Property'
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'
import SchemaSimple from './SchemaSimple.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        SchemaSimple,
        SelectButton,
    },
    props: {
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
    },
    setup(props, context) {
        const nameManager = ss.project.getPreset('FieldName')!.propertyManager
        const typexx = ['boolean', 'integer', 'number', 'string'].map((item, index) => {
            return {
                id: index + 1,
                un: item,
            }
        })

        class Schema {
            un = ''
            type = ''
        }

        function addName(selected: Property, item: Schema) {
            item.type = selected.tag
        }

        function addType(selected: Record<string, any>, item: Schema) {
            item.type = item.un
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

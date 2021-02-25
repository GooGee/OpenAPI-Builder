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
                    <select
                        v-model="selected"
                        @change="add($event.target.value)"
                        class="form-control wa"
                    >
                        <option value="" disabled>----</option>
                        <option v-for="item in nameManager.list" :key="item.ui" :value="item.ui">
                            {{ item.ui }}
                        </option>
                    </select>
                </td>
                <td></td>
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
import SchemaSimple from './SchemaSimple.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        SchemaSimple,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selected: '',
            nameManager: sss.getProject().getPreset('FieldName')!.propertyManager,
        }
    },
    methods: {
        add(name: string) {
            try {
                const found = this.nameManager.find(name)!
                const item = this.manager.make(found.ui)
                item.type = found.tag
                this.manager.add(item)
                this.selected = ''
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

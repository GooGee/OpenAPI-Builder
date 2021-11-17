<template>
    <table v-if="sidebar.item.isComposition" class="table">
        <thead>
            <tr>
                <th>required</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in fieldxx" :key="item.ui">
                <td>
                    <span class="custom-control custom-switch inline">
                        <input
                            :id="'required' + item.ui"
                            :checked="exist(item.un)"
                            @click="add(item.un)"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="'required' + item.ui"
                            class="custom-control-label"
                        ></label>
                    </span>
                    {{ item.un }}
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <span @click="clear" class="btn btn-outline-danger"> Clear </span>
                </td>
            </tr>
        </tfoot>
    </table>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import ss from '@/ss'
import { defineComponent, inject } from 'vue'

export default defineComponent({
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<SchemaComplex>
        const schema = sidebar.item!
        const manager = schema.requiredManager
        function add(name: string) {
            const found = manager.findByUN(name)
            if (found) {
                manager.remove(found)
            } else {
                const item = manager.make(name)
                manager.add(item)
            }
        }
        function clear() {
            if (confirm('Are you sure?')) {
                manager.clear()
            }
        }
        function exist(name: string) {
            return manager.hasUN(name)
        }
        const fieldxx = ss.project.oapi.getSchemaFieldList(schema)
        return { add, clear, exist, fieldxx, sidebar }
    },
})
</script>

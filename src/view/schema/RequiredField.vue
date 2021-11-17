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
                            :checked="manager.has(item.ui)"
                            @click="add(item.ui)"
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
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<SchemaComplex>
        const manager = computed(() => sidebar.item!.requiredManager)
        function add(ui: number) {
            const found = manager.value.find(ui)
            if (found) {
                manager.value.remove(found)
            } else {
                const item = manager.value.make(ui)
                manager.value.add(item)
            }
        }
        function clear() {
            if (confirm('Are you sure?')) {
                manager.value.clear()
            }
        }
        const fieldxx = computed(() =>
            ss.project.oapi.getSchemaFieldList(sidebar.item!),
        )
        return { add, clear, fieldxx, manager, sidebar }
    },
})
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th>{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in fieldxx" :key="item.ui">
                <td>
                    <span class="custom-control custom-switch inline">
                        <input
                            :id="'checked' + item.ui"
                            :checked="manager.has(item.ui)"
                            @click="add(item.ui)"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="'checked' + item.ui"
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
</template>

<script lang="ts">
import UIItemManager from '@/model/Entity/UIItemManager'
import UniqueItemInterface from '@/model/Entity/UniqueItemInterface'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        fieldxx: {
            type: Object as PropType<UniqueItemInterface>,
            required: true,
        },
        manager: {
            type: Object as PropType<UIItemManager>,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        function add(ui: number) {
            const found = props.manager.find(ui)
            if (found) {
                props.manager.remove(found)
            } else {
                const item = props.manager.make(ui)
                props.manager.add(item)
            }
        }
        function clear() {
            if (confirm('Are you sure?')) {
                props.manager.clear()
            }
        }
        return { add, clear }
    },
})
</script>

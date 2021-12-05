<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.description"
                    />
                </td>
            </tr>
            <tr v-if="item.headerManager === undefined">
                <td class="text-right">required</td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="required"
                            v-model="item.required"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label for="required" class="custom-control-label"></label>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBarItem from '@/model/Entity/SideBarItem'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<SideBarItem>,
            required: true,
        },
    },
})
</script>

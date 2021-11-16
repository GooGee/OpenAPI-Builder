<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="sidebar.item.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">externalValue</td>
                <td>
                    <input
                        v-model="sidebar.item.externalValue"
                        type="text"
                        class="form-control"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">summary</td>
                <td>
                    <input
                        v-model="sidebar.item.summary"
                        type="text"
                        class="form-control"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">value</td>
                <td>
                    <JSONText :item="sidebar.item.value" title="example"></JSONText>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import Example from '@/model/OAPI/Example'
import { defineComponent, PropType } from 'vue'
import JSONText from './JSONText.vue'

export default defineComponent({
    components: {
        JSONText,
    },
    props: {
        sidebar: {
            type: Object as PropType<SideBar<Example>>,
            required: true,
        },
    },
})
</script>

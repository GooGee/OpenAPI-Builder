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
                <td class="text-right">example</td>
                <td>
                    <JSONText :item="sidebar.item.example" title="example"></JSONText>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, inject } from 'vue'
import JSONText from '../oapi/JSONText.vue'

export default defineComponent({
    components: {
        JSONText,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar
        return { sidebar }
    },
})
</script>

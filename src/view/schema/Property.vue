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
                    <textarea
                        v-model="sidebar.item.example"
                        class="form-control"
                        spellcheck="false"
                        rows="3"
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, inject } from 'vue'

export default defineComponent({
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar
        return { sidebar }
    },
})
</script>

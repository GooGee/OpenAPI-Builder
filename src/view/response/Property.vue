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
            <tr v-if="isRequestBody">
                <td class="text-right">required</td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="required"
                            v-model="sidebar.item.required"
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
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup(props, context) {
        const router = useRouter()
        const sidebar = inject('sidebar') as SideBar
        return {
            sidebar,
            isRequestBody: router.currentRoute.value.path === '/request/property',
        }
    },
})
</script>

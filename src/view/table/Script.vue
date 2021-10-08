<template>
    <table v-if="sidebar.item" class="table">
        <caption class="caption-top">
            <input
                v-model="sidebar.item.description"
                placeholder="description"
                type="text"
                class="form-control"
            />
        </caption>
        <tbody>
            <tr>
                <td>
                    <EditButton :item="sidebar.item"></EditButton>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea
                        v-model="sidebar.item.code"
                        class="form-control"
                        rows="11"
                        spellcheck="false"
                        readonly
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, PropType } from 'vue'
import EditButton from '../button/EditButton.vue'

export default defineComponent({
    components: {
        EditButton,
    },
    props: {
        sidebar: {
            type: Object as PropType<SideBar>,
            required: true,
        },
    },
})
</script>

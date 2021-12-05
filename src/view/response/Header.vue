<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Header</h2>
        </caption>
        <tbody>
            <tr>
                <td>
                    <ReferenceList :manager="manager"></ReferenceList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { ReferenceManager } from '@/model/OAPI/Reference'
import { defineComponent, PropType } from 'vue'
import ReferenceList from '../oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        ReferenceList,
    },
    props: {
        manager: {
            type: Object as PropType<ReferenceManager>,
            required: true,
        },
    },
})
</script>

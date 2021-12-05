<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Content</h2>
        </caption>
        <tbody>
            <tr>
                <td>
                    <MediaTypeList :manager="manager"></MediaTypeList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { MediaTypeManager } from '@/model/OAPI/MediaType'
import { defineComponent, PropType } from 'vue'
import MediaTypeList from '../oapi/MediaTypeList.vue'

export default defineComponent({
    components: {
        MediaTypeList,
    },
    props: {
        manager: {
            type: Object as PropType<MediaTypeManager>,
            required: true,
        },
    },
})
</script>

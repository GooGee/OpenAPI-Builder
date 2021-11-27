<template>
    <Layer :item="item">
        <tr>
            <td class="text-right">LayerMediaType</td>
            <td>
                <ReferenceList :manager="item.mtManager"></ReferenceList>
            </td>
        </tr>
    </Layer>
</template>

<script lang="ts">
import LayerRequestBody from '@/model/Entity/LayerRequestBody'
import LayerResponse from '@/model/Entity/LayerResponse'
import { defineComponent, PropType } from 'vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import Layer from './Layer.vue'

export default defineComponent({
    components: {
        ReferenceList,
        Layer,
    },
    props: {
        item: {
            type: Object as PropType<LayerRequestBody | LayerResponse>,
            required: true,
        },
    },
})
</script>

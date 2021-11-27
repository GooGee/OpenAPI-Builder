<template>
    <Layer :item="item">
        <tr>
            <td class="text-right">LayerOperation</td>
            <td>
                <ReferenceList :manager="item.operationManager"></ReferenceList>
            </td>
        </tr>
    </Layer>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
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
            type: Object as PropType<LayerPath>,
            required: true,
        },
    },
})
</script>

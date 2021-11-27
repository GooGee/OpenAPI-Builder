<template>
    <Layer :item="item">
        <tr>
            <td class="text-right">LayerRequestBody</td>
            <td>
                <Reference :reference="item.requestBody"></Reference>
            </td>
        </tr>
        <tr>
            <td class="text-right">LayerResponse</td>
            <td>
                <ReferenceList :manager="item.statusManager"></ReferenceList>
            </td>
        </tr>
    </Layer>
</template>

<script lang="ts">
import LayerOperation from '@/model/Entity/LayerOperation'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'
import ReferenceList from '../oapi/ReferenceList.vue'
import Layer from './Layer.vue'

export default defineComponent({
    components: {
        Reference,
        ReferenceList,
        Layer,
    },
    props: {
        item: {
            type: Object as PropType<LayerOperation>,
            required: true,
        },
    },
})
</script>

<template>
    <Layer :item="item">
        <tr>
            <td class="text-right">LayerSchema</td>
            <td>
                <Reference :reference="item.schema"></Reference>
            </td>
        </tr>
    </Layer>
</template>

<script lang="ts">
import LayerMediaType from '@/model/Entity/LayerMediaType'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'
import Layer from './Layer.vue'

export default defineComponent({
    components: {
        Reference,
        Layer,
    },
    props: {
        item: {
            type: Object as PropType<LayerMediaType>,
            required: true,
        },
    },
})
</script>

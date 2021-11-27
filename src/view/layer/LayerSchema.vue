<template>
    <Layer :item="item">
        <tr>
            <td class="text-right">LayerSchema</td>
            <td>
                <Reference :reference="item.dependent"></Reference>
            </td>
        </tr>
    </Layer>
</template>

<script lang="ts">
import LayerSchema from '@/model/Entity/LayerSchema'
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
            type: Object as PropType<LayerSchema>,
            required: true,
        },
    },
})
</script>

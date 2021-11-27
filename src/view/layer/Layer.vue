<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right w111">color</td>
                <td>
                    <ColorPanel v-model:color="item.color"></ColorPanel>
                </td>
            </tr>
            <tr>
                <td class="text-right">namePattern</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.namePattern"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <Reference :reference="item.script"></Reference>
                </td>
            </tr>
            <slot></slot>
        </tbody>
    </table>
</template>

<script lang="ts">
import Layer from '@/model/Entity/Layer'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'
import ColorPanel from '../part/ColorPanel.vue'

export default defineComponent({
    components: {
        ColorPanel,
        Reference,
    },
    props: {
        item: {
            type: Object as PropType<Layer>,
            required: true,
        },
    },
})
</script>

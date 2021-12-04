<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right">unPattern</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="schema.unPattern"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <Reference :reference="schema.script"></Reference>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import LayerSchema from '@/model/Entity/LayerSchema'
import { defineComponent, PropType } from 'vue'
import Reference from '../oapi/Reference.vue'

export default defineComponent({
    components: {
        Reference,
    },
    props: {
        schema: {
            type: Object as PropType<LayerSchema>,
            required: true,
        },
    },
})
</script>

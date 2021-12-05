<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">un</td>
                <td>
                    <slot></slot>
                </td>
            </tr>
            <tr>
                <td class="text-right">schema</td>
                <td>
                    <Reference :reference="item.schema"></Reference>
                </td>
            </tr>
            <tr>
                <td class="text-right">examples</td>
                <td>
                    <ReferenceList :manager="item.exampleManager"></ReferenceList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import MediaType from '@/model/OAPI/MediaType'
import { defineComponent, PropType } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from './Reference.vue'
import ReferenceList from './ReferenceList.vue'

export default defineComponent({
    components: {
        DeleteButton,
        Reference,
        ReferenceList,
    },
    props: {
        item: {
            type: Object as PropType<MediaType>,
            required: true,
        },
    },
})
</script>

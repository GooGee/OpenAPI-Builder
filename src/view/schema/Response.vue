<template>
    <div v-if="isRequestBody">{{ getUN(item.unPattern) }}</div>
    <div v-else class="btn-group">
        <span class="btn btn-outline-secondary">{{ item.un }}</span>
        <span v-if="item.useExisted" class="btn btn-outline-secondary">
            {{ findUN(item.reference) }}
        </span>
        <span v-else class="btn btn-outline-secondary">
            {{ getUN(item.unPattern) }}
        </span>
    </div>
    <div v-if="!item.useExisted">
        <div class="text-secondary mt11">schema</div>
        <div>
            {{ getUN(item.schema.unPattern) }}
        </div>
        <div class="text-secondary mt11">MediaType</div>
        <UNList :getUN="getUN" :list="item.mtManager.list"></UNList>
    </div>
</template>

<script lang="ts">
import LayerRequestBody from '@/model/Entity/LayerRequestBody'
import Reference from '@/model/OAPI/Reference'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import UNList from './UNList.vue'

export default defineComponent({
    components: {
        UNList,
    },
    props: {
        getUN: {
            type: Function,
            required: true,
        },
        item: {
            type: Object as PropType<LayerRequestBody>,
            required: true,
        },
        isRequestBody: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(props, context) {
        function findUN(reference: Reference) {
            if (reference.ui === 0) {
                return '+'
            }

            const found = ss.finder.find(reference)
            if (found === undefined) {
                return '?'
            }
            return found.un
        }

        return {
            findUN,
        }
    },
})
</script>

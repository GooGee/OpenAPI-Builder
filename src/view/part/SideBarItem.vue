<template>
    <div class="list-group-item list-group-item-action">
        <div class="inline hover-bg">
            <span class="btn-group">
                <DeleteButton
                    :manager="manager"
                    :item="item"
                    @remove="remove"
                    class="btn-sm hover-button"
                ></DeleteButton>
                <ChangeButton
                    :manager="manager"
                    :item="item"
                    text="/"
                    class="btn-sm hover-button"
                ></ChangeButton>
            </span>
            <span :class="{ 'text-primary': active }" class="pointer ml11">
                {{ item.un }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import emitter from '@/emitter'
import { EventEnum } from '@/model/Entity/Event'
import UniqueItemInterface from '@/model/Entity/UniqueItemInterface'
import UniqueItemManagerInterface from '@/model/Entity/UniqueItemManagerInterface'
import { defineComponent, PropType } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
    },
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        item: {
            type: Object as PropType<UniqueItemInterface>,
            required: true,
        },
        manager: {
            type: Object as PropType<UniqueItemManagerInterface>,
            required: true,
        },
    },
    setup(props, context) {
        function remove() {
            emitter.emit(EventEnum['sidebar-list-change'])
        }
        return {
            item: props.item,
            manager: props.manager,
            remove,
        }
    },
})
</script>

<style scoped>
.hover-bg:not(:hover) .hover-button {
    display: none;
}
</style>

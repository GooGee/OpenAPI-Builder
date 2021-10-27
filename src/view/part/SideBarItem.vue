<template>
    <div class="list-group-item list-group-item-action">
        <div class="hover-bg inline">
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
                    class="btn-sm hover-button mr11"
                ></ChangeButton>
            </span>
            <span class="pointer">{{ item.un }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import emitter from '@/emitter'
import { EventEnum } from '@/model/Entity/Event'
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import { defineComponent, PropType } from 'vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
    },
    props: {
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
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

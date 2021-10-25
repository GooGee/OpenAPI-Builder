<template>
    <div class="list-group-item list-group-item-action">
        <div class="hover-bg inline">
            <span class="btn-group">
                <DeleteButton
                    :manager="manager"
                    :item="item"
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
        return {
            item: props.item,
            manager: props.manager,
        }
    },
})
</script>

<template>
    <div>
        <EditList :manager="manager" :canAdd="false" :canEdit="false"></EditList>
        <ReferenceShow @select="select" :type="type"> + </ReferenceShow>
    </div>
</template>

<script lang="ts">
import Noty from 'noty'
import { defineComponent, PropType } from 'vue'
import { ReferenceManager, ReferenceType } from '@/model/OAPI/Reference'
import EditList from './EditList.vue'
import ReferenceShow from './ReferenceShow.vue'
import UniqueItem from '@/model/Base/UniqueItem'

export default defineComponent({
    components: {
        EditList,
        ReferenceShow,
    },
    props: {
        manager: {
            type: Object as PropType<ReferenceManager>,
            required: true,
        },
        type: {
            type: String as PropType<ReferenceType>,
            required: false,
            default: ReferenceType.schemas,
        },
    },
    methods: {
        select(selected: UniqueItem) {
            try {
                const item = this.manager.make(selected.ui, this.type)
                this.manager.add(item)
            } catch (error) {
                new Noty({
                    text: error.message,
                    theme: 'bootstrap-v4',
                    type: 'error',
                }).show()
            }
        },
    },
})
</script>

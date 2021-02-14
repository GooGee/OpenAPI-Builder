<template>
    <div>
        <div>
            <ReferenceShow @select="select" :type="type"> + </ReferenceShow>
        </div>
        <EditList :manager="manager" :canAdd="false" :canEdit="false"></EditList>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReferenceManager, ReferenceType } from '@/model/OAPI/Reference'
import sss from '@/sss.ts'
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
                alert(error)
            }
        },
    },
})
</script>

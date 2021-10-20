<template>
    <div>
        <EditList :manager="manager" :canAdd="false" :canEdit="false"></EditList>
        <Reference
            :reference="reference"
            :withBlank="false"
            @select="select"
        ></Reference>
    </div>
</template>

<script lang="ts">
import Toast from '@/model/Service/Toast'
import { ReferenceManager, ReferenceType } from '@/model/OAPI/Reference'
import { defineComponent, PropType } from 'vue'
import EditList from '../part/EditList.vue'
import Reference from './Reference.vue'

export default defineComponent({
    components: {
        EditList,
        Reference,
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
    setup(props, context) {
        const reference = props.manager.make('', props.type)
        function select() {
            try {
                const item = props.manager.make(reference.un, props.type)
                props.manager.add(item)
            } catch (error) {
                Toast.error(error.message)
            }
        }
        return { reference, select }
    },
})
</script>

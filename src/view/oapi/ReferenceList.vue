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
import { ReferenceManager } from '@/model/OAPI/Reference'
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
    },
    setup(props, context) {
        const reference = {
            ui: 0,
            un: '',
            type: props.manager.referenceType,
        }
        function select() {
            try {
                const item = props.manager.make(reference.un)
                props.manager.add(item)
            } catch (error) {
                Toast.error(error.message)
            }
        }
        return { reference, select }
    },
})
</script>

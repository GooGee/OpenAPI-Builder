<template>
    <select v-model="selected" @change="select" class="form-control wa">
        <option :value="0" disabled>----</option>
        <option v-for="item in list" :key="item.ui" :value="item.ui">
            {{ item.un }}
        </option>
    </select>
</template>

<script lang="ts">
import SchemaField, { SchemaFieldManager } from '@/model/OAPI/SchemaField'
import Toast from '@/model/Service/Toast'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        list: {
            type: Object as PropType<SchemaField[]>,
            required: true,
        },
        manager: {
            type: Object as PropType<SchemaFieldManager>,
            required: true,
        },
    },
    setup(props, context) {
        const selected = ref(0)
        function select() {
            try {
                const found = props.list.find((item) => item.ui === selected.value)
                if (found === undefined) {
                    return
                }
                const item = props.manager.make(found.un)
                item.type = found.type
                item.schemaUI = found.schemaUI
                props.manager.add(item)
                selected.value = 0
                context.emit('select', found, item)
            } catch (error) {
                Toast.error(error)
            }
        }
        return {
            select,
            selected,
        }
    },
})
</script>

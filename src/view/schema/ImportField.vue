<template>
    <ImportGuide v-if="sss.sidebar.item.isObject" :keyxx="keyxx" @converted="load"></ImportGuide>
    <span v-else class="mtb11">Only for object</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ImportGuide from '../part/ImportGuide.vue'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import SchemaSimple from '@/model/OAPI/SchemaSimple'
import toast from '@/helper/toast'

export default defineComponent({
    components: {
        ImportGuide,
    },
    data() {
        return {
            sss,
            keyxx: ['ui', 'type', 'format'],
        }
    },
    methods: {
        load(data: SchemaSimple[]) {
            // console.log(data)
            try {
                const schema = (sss.sidebar.item as any) as SchemaComplex
                schema.object.schemaManager.loadList(data)
                toast.toast('Imported')
            } catch (error) {
                toast.error(error.message)
            }
        },
    },
})
</script>

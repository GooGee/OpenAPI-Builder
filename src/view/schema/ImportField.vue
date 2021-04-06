<template>
    <ImportGuide
        v-if="sss.sidebar.item.isObject"
        :manager="manager"
        @converted="load"
    ></ImportGuide>
    <span v-else class="mtb11">Only for object</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ImportGuide from '../part/ImportGuide.vue'
import { KeyManager } from '@/model/Data/Key'
import SchemaComplex from '@/model/OAPI/SchemaComplex'
import SchemaSimple from '@/model/OAPI/SchemaSimple'
import toast from '@/helper/toast'

export default defineComponent({
    components: {
        ImportGuide,
    },
    setup() {
        const manager = new KeyManager()
        const ui = manager.make('ui')
        manager.add(ui)
        ui.required = true
        const type = manager.make('type')
        manager.add(type)
        const format = manager.make('format')
        manager.add(format)

        function load(data: SchemaSimple[]) {
            // console.log(data)
            try {
                const schema = (sss.sidebar.item as any) as SchemaComplex
                schema.object.schemaManager.loadList(data)
                toast.toast('Imported')
            } catch (error) {
                toast.error(error.message)
            }
        }
        return {
            load,
            manager,
            sss,
        }
    },
})
</script>

<template>
    <ImportGuide :manager="manager" @converted="load"></ImportGuide>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ImportGuide from '../part/ImportGuide.vue'
import { KeyManager } from '@/model/Data/Key'
import toast from '@/helper/toast'
import Preset from '@/model/Data/Preset'
import Property from '@/model/Data/Property'

export default defineComponent({
    components: {
        ImportGuide,
    },
    setup() {
        const manager = new KeyManager()
        const ui = manager.make('ui')
        manager.add(ui)
        ui.required = true
        const value = manager.make('value')
        manager.add(value)
        const tag = manager.make('tag')
        manager.add(tag)

        function load(data: Property[]) {
            // console.log(data)
            try {
                const preset = (sss.sidebar.item as any) as Preset
                preset.propertyManager.loadList(data)
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

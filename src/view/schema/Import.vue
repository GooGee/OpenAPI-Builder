<template>
    <div v-if="sidebar.item.isComposition">
        <ImportText v-if="importing" @parse="showMap">
            <tr>
                <td class="text-right"></td>
                <td>
                    <span class="text-danger">data must be JSON `object[]`</span>
                </td>
            </tr>
        </ImportText>
        <ImportMap
            v-else
            :manager="manager"
            :valuexx="valuexx"
            @back="importing = true"
            @map="migrate"
        ></ImportMap>
    </div>
    <span v-else class="mtb11">Only for composition</span>
</template>

<script lang="ts">
import { ImportItemManager } from '@/model/Entity/ImportItem'
import ObjectMap from '@/model/Entity/ObjectMap'
import SideBar from '@/model/Entity/SideBar'
import Schema from '@/model/OAPI/Schema'
import Converter from '@/model/Service/Converter'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { defineComponent, inject, ref } from 'vue'
import ImportMap from '../part/ImportMap.vue'
import ImportText from '../part/ImportText.vue'

export default defineComponent({
    components: {
        ImportMap,
        ImportText,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<Schema>

        const importing = ref(true)
        const itemxx = ref<ObjectMap[]>([])
        const valuexx = ref<string[]>([])

        const manager = new ImportItemManager()
        function addKey() {
            const un = manager.make('un')
            un.required = true
            manager.add(un)
            const type = manager.make('type')
            manager.add(type)
            const format = manager.make('format')
            manager.add(format)
        }
        addKey()

        function showMap(result: ObjectMap[]) {
            importing.value = false
            itemxx.value = result
            if (result.length) {
                valuexx.value = Object.keys(result[0])
            }
        }

        function migrate(map: Map<string, string>) {
            try {
                const list = Converter.migrate(itemxx.value, map)
                ss.project.oapi.importSchema({ list } as any, sidebar.item!.ui)
                Toast.success('OK')
            } catch (error) {
                Toast.error(error)
            }
        }

        return { importing, manager, migrate, showMap, sidebar, valuexx }
    },
})
</script>

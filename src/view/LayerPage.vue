<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <LayerMediaType
                v-if="type === 'LayerMediaType'"
                :item="sidebar.item"
            ></LayerMediaType>
            <LayerOperation
                v-if="type === 'LayerOperation'"
                :item="sidebar.item"
            ></LayerOperation>
            <LayerPath v-if="type === 'LayerPath'" :item="sidebar.item"></LayerPath>
            <LayerResponse
                v-if="type === 'LayerRequestBody' || type === 'LayerResponse'"
                :item="sidebar.item"
            ></LayerResponse>
            <LayerSchema
                v-if="type === 'LayerSchema'"
                :item="sidebar.item"
            ></LayerSchema>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { computed, defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import LayerMediaType from './layer/LayerMediaType.vue'
import LayerOperation from './layer/LayerOperation.vue'
import LayerPath from './layer/LayerPath.vue'
import LayerResponse from './layer/LayerResponse.vue'
import LayerSchema from './layer/LayerSchema.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        LayerMediaType,
        LayerOperation,
        LayerPath,
        LayerResponse,
        LayerSchema,
        SideBar,
    },
    setup(props, context) {
        const type = computed(function () {
            const route = useRoute()
            return route.path.substring(1) as SideBarEnum
        })
        const sidebar = computed(function () {
            return reactive(ss.sbManager.get(type.value))
        })
        return { sidebar, type }
    },
})
</script>

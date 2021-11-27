<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <Layer :item="sidebar.item"></Layer>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { computed, defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Layer from './layer/Layer.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        Layer,
        SideBar,
    },
    setup(props, context) {
        const sidebar = computed(function () {
            const route = useRoute()
            const type = route.path.substring(1) as SideBarEnum
            return reactive(ss.sbManager.get(type))
        })
        return { sidebar }
    },
})
</script>

<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <Property :item="sidebar.item"></Property>
            <Content :manager="sidebar.item.mediaTypeManager"></Content>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import SideBar from './part/SideBar.vue'
import Content from './response/Content.vue'
import Property from './response/Property.vue'

export default defineComponent({
    components: {
        Content,
        Property,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Request))
        return { sidebar }
    },
})
</script>

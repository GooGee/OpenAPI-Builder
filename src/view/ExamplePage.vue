<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div class="col-9">
            <Example :sidebar="sidebar"></Example>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import Example from './oapi/Example.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        Example,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Example))
        return { sidebar }
    },
})
</script>

<template>
    <div class="row">
        <div class="col-6">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-6">
            <input
                type="text"
                class="form-control mtb11"
                placeholder="description"
                v-model="sidebar.item.description"
            />
            <ServerVariable :manager="sidebar.item.variableManager"></ServerVariable>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import ServerVariable from './oapi/ServerVariable.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        ServerVariable,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Server))
        return { sidebar }
    },
})
</script>

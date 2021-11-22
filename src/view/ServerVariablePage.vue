<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <Enumer :item="sidebar.item" :isServerVariable="true">
                <tr>
                    <td class="text-right">default</td>
                    <td>
                        <input
                            type="text"
                            class="form-control"
                            v-model="sidebar.item.default"
                        />
                    </td></tr
            ></Enumer>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import Enumer from './oapi/Enumer.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        Enumer,
        SideBar,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.ServerVariable))
        return { sidebar }
    },
})
</script>

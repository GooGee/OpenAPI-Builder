<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar" @select="changeKey"></SideBar>
        </div>

        <div class="col-9">
            <ul class="nav nav-tabs mt11">
                <li class="nav-item">
                    <router-link to="/security/requirement" active-class="active" class="nav-link">
                        Requirement
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/security/scheme" active-class="active" class="nav-link">
                        Scheme
                    </router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SideBarEnum } from '@/model/Data/SideBar'
import SideBar from './part/SideBar.vue'
import PageSetup from './hook/PageSetup'

export default defineComponent({
    components: {
        SideBar,
    },
    setup() {
        const data = PageSetup(SideBarEnum.SecurityScheme)
        return data
    },
})
</script>

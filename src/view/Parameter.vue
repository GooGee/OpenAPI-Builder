<template>
    <div class="row">
        <div class="col-3">
            <SideBar></SideBar>
        </div>

        <div class="col-9">
            <Header :isParameter="true"></Header>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './oapi/Header.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        Header,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Parameter)
    },
})
</script>

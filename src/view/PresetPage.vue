<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <h2 v-if="sss.sidebar.item.required">{{ sss.sidebar.item.ui }}</h2>
            <div v-else class="btn-group mt11">
                <DeleteButton
                    :manager="sss.sidebar.manager"
                    :item="sss.sidebar.item"
                    @deleted="sss.sidebar.item = null"
                ></DeleteButton>
                <ChangeButton :item="sss.sidebar.item"></ChangeButton>
            </div>
            <input
                type="text"
                class="form-control mt11"
                placeholder="description"
                v-model="sss.sidebar.item.description"
            />

            <TabBar :route="route" class="mt11"></TabBar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import TabBar from './part/TabBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        SideBar,
        TabBar,
    },
    data() {
        return {
            sss,
            route: this.$router.options.routes.find(route => route.name === 'preset'),
        }
    },
    created() {
        sss.show(SideBarEnum.Preset)
    },
})
</script>

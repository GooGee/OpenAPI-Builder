<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar" @select="changeKey"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <div class="btn-group mtb11">
                <DeleteButton
                    :manager="sidebar.manager"
                    :item="sidebar.item"
                    @deleted="sidebar.item = null"
                ></DeleteButton>
                <ChangeButton :item="sidebar.item"></ChangeButton>
            </div>
            <input
                type="text"
                class="form-control mb11"
                placeholder="description"
                v-model="sidebar.item.description"
            />
            <ServerVariable :manager="sidebar.item.variableManager"></ServerVariable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SideBarEnum } from '@/model/Data/SideBar'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import ServerVariable from './oapi/ServerVariable.vue'
import SideBar from './part/SideBar.vue'
import PageSetup from './hook/PageSetup'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        ServerVariable,
        SideBar,
    },
    setup() {
        const data = PageSetup(SideBarEnum.Server)
        return data
    },
})
</script>

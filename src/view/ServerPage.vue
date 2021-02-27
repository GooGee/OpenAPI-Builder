<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar"></SideBar>
        </div>

        <div class="col-9">
            <template v-if="sss.sidebar.item">
                <div class="btn-group mtb11">
                    <DeleteButton
                        :manager="sss.sidebar.manager"
                        :item="sss.sidebar.item"
                        @deleted="sss.sidebar.item = null"
                    ></DeleteButton>
                    <ChangeButton :item="sss.sidebar.item"></ChangeButton>
                </div>
                <input
                    type="text"
                    class="form-control mb11"
                    placeholder="description"
                    v-model="sss.sidebar.item.description"
                />
                <ServerVariable :manager="sss.sidebar.item.variableManager"></ServerVariable>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import ServerVariable from './oapi/ServerVariable.vue'
import SideBar from './part/SideBar.vue'

export default defineComponent({
    components: {
        ChangeButton,
        DeleteButton,
        ServerVariable,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Server)
    },
})
</script>

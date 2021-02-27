<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar"></SideBar>
        </div>

        <div class="col-9">
            <table v-if="sss.sidebar.item" class="table">
                <caption class="caption-top">
                    <h2 v-if="sss.sidebar.item.required">{{ sss.sidebar.item.ui }}</h2>
                    <div v-else class="btn-group">
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
                </caption>
                <thead>
                    <tr>
                        <th>ui</th>
                        <th>value</th>
                        <th>tag</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in sss.sidebar.item.propertyManager.list" :key="item.ui">
                        <td>
                            <div class="btn-group mr11">
                                <DeleteButton
                                    :manager="sss.sidebar.item.propertyManager"
                                    :item="item"
                                ></DeleteButton>
                                <ChangeButton :item="item"></ChangeButton>
                            </div>
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="item.value" />
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="item.tag" />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <AddButton :manager="sss.sidebar.item.propertyManager"></AddButton>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Preset)
    },
})
</script>

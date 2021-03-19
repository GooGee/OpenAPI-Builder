<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar" @select="select"></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sidebar.item">
                <tr>
                    <td class="text-right">global</td>
                    <td>
                        <span class="custom-control custom-switch inline mr11">
                            <input
                                id="global"
                                v-model="sidebar.item.global"
                                type="checkbox"
                                class="custom-control-input"
                            />
                            <label for="global" class="custom-control-label"></label>
                        </span>
                        <span>e.g. define global variable / function</span>
                    </td>
                </tr>
                <tr v-show="sidebar.item.global === false">
                    <td class="text-right">single</td>
                    <td>
                        <span class="custom-control custom-switch inline mr11">
                            <input
                                id="single"
                                v-model="sidebar.item.single"
                                type="checkbox"
                                class="custom-control-input"
                            />
                            <label for="single" class="custom-control-label"></label>
                        </span>
                        <span> if set to single, this script will not show in `Schema` page </span>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">code</td>
                    <td>
                        <EditButton
                            v-model:code="sidebar.item.code"
                            :file="file"
                            class="mr11"
                        ></EditButton>
                        <RunButton v-if="sidebar.item.single" :item="sidebar.itemitem"></RunButton>
                    </td>
                </tr>
            </PropertyTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditButton from './button/EditButton.vue'
import RunButton from './button/RunButton.vue'
import PropertyTable from './oapi/PropertyTable.vue'
import SideBar from './part/SideBar.vue'
import { SideBarEnum } from '@/model/Data/SideBar'
import UniqueItem from '@/model/Base/UniqueItem'
import File from '@/model/Service/File'
import PageSetup from '@/store/SetupPage'

export default defineComponent({
    components: {
        EditButton,
        PropertyTable,
        RunButton,
        SideBar,
    },
    setup() {
        const data = PageSetup(SideBarEnum.Script) as any
        data.file = ''
        data.select = function(item: UniqueItem) {
            data.file = File.getScriptPath(item.ui + '.js')
        }
        return data
    },
})
</script>

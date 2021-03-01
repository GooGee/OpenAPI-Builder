<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" @select="select"></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">global</td>
                    <td>
                        <span class="custom-control custom-switch inline mr11">
                            <input
                                id="global"
                                v-model="sss.sidebar.item.global"
                                type="checkbox"
                                class="custom-control-input"
                            />
                            <label for="global" class="custom-control-label"></label>
                        </span>
                        <span>e.g. define global variable / function</span>
                    </td>
                </tr>
                <tr v-show="sss.sidebar.item.global === false">
                    <td class="text-right">single</td>
                    <td>
                        <span class="custom-control custom-switch inline mr11">
                            <input
                                id="single"
                                v-model="sss.sidebar.item.single"
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
                            @update="update"
                            :file="file"
                            :content="sss.sidebar.item.code"
                            class="mr11"
                        ></EditButton>
                        <RunButton
                            v-if="sss.sidebar.item.single"
                            :item="sss.sidebar.item"
                        ></RunButton>
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
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'
import UniqueItem from '@/model/Base/UniqueItem'
import File from '@/model/Service/File'
import Script from '@/model/Data/Script'

export default defineComponent({
    components: {
        EditButton,
        PropertyTable,
        RunButton,
        SideBar,
    },
    data() {
        return {
            sss,
            file: '',
        }
    },
    created() {
        sss.show(SideBarEnum.Script)
        if (sss.sidebar.item) {
            this.select(sss.sidebar.item)
        }
    },
    methods: {
        select(item: UniqueItem) {
            this.file = File.getScriptPath(item.ui + '.js')
        },
        update(text: string) {
            const item = sss.sidebar.item as Script
            item.code = text
        },
    },
})
</script>

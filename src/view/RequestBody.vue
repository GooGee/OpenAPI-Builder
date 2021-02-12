<template>
    <div class="row">
        <div class="col-3">
            <SideBar></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">required</td>
                    <td>
                        <span class="custom-control custom-switch">
                            <input
                                id="required"
                                v-model="sss.sidebar.item.required"
                                type="checkbox"
                                class="custom-control-input"
                            />
                            <label for="required" class="custom-control-label"></label>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">content</td>
                    <td>
                        <MediaTypeList :manager="sss.sidebar.item.mediaTypeManager"></MediaTypeList>
                    </td>
                </tr>
            </PropertyTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MediaTypeList from './oapi/MediaTypeList.vue'
import PropertyTable from './oapi/PropertyTable.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        MediaTypeList,
        PropertyTable,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Request)
    },
})
</script>

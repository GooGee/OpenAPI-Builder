<template>
    <div class="row">
        <div class="col-3">
            <SideBar></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">content</td>
                    <td>
                        <MediaTypeList :manager="sss.sidebar.item.mediaTypeManager"></MediaTypeList>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">headers</td>
                    <td>
                        <ReferenceList
                            :manager="sss.sidebar.item.headerManager"
                            type="headers"
                        ></ReferenceList>
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
import ReferenceList from './oapi/ReferenceList.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        MediaTypeList,
        PropertyTable,
        SideBar,
        ReferenceList,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Response)
    },
})
</script>

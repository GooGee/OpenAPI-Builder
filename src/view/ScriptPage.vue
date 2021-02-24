<template>
    <div class="row">
        <div class="col-3">
            <SideBar></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">single</td>
                    <td>
                        <span class="custom-control custom-switch">
                            <input
                                id="single"
                                v-model="sss.sidebar.item.single"
                                type="checkbox"
                                class="custom-control-input"
                            />
                            <label for="single" class="custom-control-label"></label>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">code</td>
                    <td>
                        <EditButton :file="file" :content="sss.sidebar.item.code"></EditButton>
                    </td>
                </tr>
            </PropertyTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditButton from './button/EditButton.vue'
import PropertyTable from './oapi/PropertyTable.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'
import UniqueItem from '@/model/Base/UniqueItem'
import File from '@/model/Service/File'

export default defineComponent({
    components: {
        EditButton,
        PropertyTable,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    computed: {
        file() {
            const itme = sss.sidebar.item as UniqueItem
            return File.getScriptPath(itme.ui + '.js')
        },
    },
    created() {
        sss.show(SideBarEnum.Script)
    },
})
</script>

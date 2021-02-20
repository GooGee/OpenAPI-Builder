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
            </PropertyTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PropertyTable from './oapi/PropertyTable.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        PropertyTable,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Script)
    },
})
</script>

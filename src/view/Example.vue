<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar"></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">externalValue</td>
                    <td>
                        <input
                            v-model="sss.sidebar.item.externalValue"
                            type="text"
                            class="form-control"
                        />
                    </td>
                </tr>
                <tr>
                    <td class="text-right">summary</td>
                    <td>
                        <input
                            v-model="sss.sidebar.item.summary"
                            type="text"
                            class="form-control"
                        />
                    </td>
                </tr>
                <tr>
                    <td class="text-right">value</td>
                    <td>
                        <textarea
                            v-model="sss.sidebar.item.value"
                            class="form-control"
                            spellcheck="false"
                            rows="11"
                        ></textarea>
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
        sss.show(SideBarEnum.Example)
    },
})
</script>

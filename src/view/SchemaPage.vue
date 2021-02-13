<template>
    <div class="row">
        <div class="col-3">
            <SideBar></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">example</td>
                    <td>
                        <textarea
                            v-model="sss.sidebar.item.example"
                            class="form-control"
                            spellcheck="false"
                            rows="3"
                        ></textarea>
                    </td>
                </tr>
            </PropertyTable>

            <SchemaComplex :schema="sss.sidebar.item"></SchemaComplex>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PropertyTable from './oapi/PropertyTable.vue'
import SchemaComplex from './schema/SchemaComplex.vue'
import SideBar from './part/SideBar.vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'

export default defineComponent({
    components: {
        PropertyTable,
        SchemaComplex,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Schema)
    },
})
</script>

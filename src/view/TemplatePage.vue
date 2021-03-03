<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar"></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sss.sidebar.item">
                <tr>
                    <td class="text-right">code</td>
                    <td>
                        <EditButton
                            @update="update"
                            :file="file"
                            :content="sss.sidebar.item.code"
                        ></EditButton>
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
import Template from '@/model/Data/Template'

export default defineComponent({
    components: {
        EditButton,
        PropertyTable,
        SideBar,
    },
    data() {
        return {
            sss,
            file: '',
        }
    },
    created() {
        sss.show(SideBarEnum.Template)
        if (sss.sidebar.item) {
            this.select(sss.sidebar.item)
        }
    },
    methods: {
        select(item: UniqueItem) {
            this.file = File.getTemplatePath(item.ui + '.js')
        },
        update(text: string) {
            const item = sss.sidebar.item as Template
            item.code = text
        },
    },
})
</script>

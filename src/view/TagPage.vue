<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <ItemTable :manager="sss.sidebar.manager" class="mt11"></ItemTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'
import ItemTable from './part/ItemTable.vue'

export default defineComponent({
    components: {
        ItemTable,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show(SideBarEnum.Tag)
    },
})
</script>

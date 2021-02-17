<template>
    <ItemTable :manager="sss.sidebar.manager"></ItemTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'
import ItemTable from './ItemTable.vue'

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

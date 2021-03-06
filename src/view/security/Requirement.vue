<template>
    <table class="table">
        <thead>
            <tr>
                <td>scheme</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.ui }} </span>
                    </div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <SelectButton :list="list" :manager="manager"></SelectButton>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Data/SideBar'
import sss from '@/sss'
import { defineComponent } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import SelectButton from '../button/SelectButton.vue'

export default defineComponent({
    components: {
        DeleteButton,
        SelectButton,
    },
    data() {
        return {
            list: sss.sbManager.get(SideBarEnum.SecurityScheme).manager.list,
            manager: sss.sbManager.get(SideBarEnum.Security).manager,
        }
    },
})
</script>

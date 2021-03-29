<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <table class="table">
                <caption class="caption-top">
                    <h2>Tag</h2>
                </caption>
                <thead>
                    <tr>
                        <th class="w111">
                            <SortButton :manager="manager"></SortButton>
                            ui
                        </th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in manager.list" :key="item.ui">
                        <td>
                            <div class="btn-group">
                                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                                <ChangeButton :item="item"></ChangeButton>
                            </div>
                        </td>
                        <td>
                            <input v-model="item.description" type="text" class="form-control" />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <AddButton :manager="manager"></AddButton>
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import { SideBarEnum } from '@/model/Data/SideBar'
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SortButton from './button/SortButton.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        SortButton,
    },
    data() {
        return {
            sss,
            manager: sss.sbManager.get(SideBarEnum.Tag).manager,
        }
    },
    created() {
        sss.show(SideBarEnum.Tag)
    },
})
</script>

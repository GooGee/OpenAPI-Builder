<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <table class="table">
                <caption class="caption-top">
                    <h2>Security Requirement</h2>
                </caption>
                <tbody>
                    <tr v-for="item in sidebar.manager.list" :key="item.id">
                        <td>
                            <div class="btn-group">
                                <DeleteButton
                                    :manager="sidebar.manager"
                                    :item="item"
                                ></DeleteButton>
                                <span class="btn btn-outline-secondary">
                                    {{ item.un }}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <SelectButton
                                :list="list"
                                :manager="sidebar.manager"
                            ></SelectButton>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { SideBarEnum } from '@/model/Entity/SideBar'
import ss from '@/ss'
import { defineComponent, reactive } from 'vue'
import DeleteButton from './button/DeleteButton.vue'
import SelectButton from './button/SelectButton.vue'

export default defineComponent({
    components: {
        DeleteButton,
        SelectButton,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.SecurityRequirement))
        return {
            list: ss.sbManager.get(SideBarEnum.SecurityScheme).manager.list,
            sidebar,
        }
    },
})
</script>

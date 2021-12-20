<template>
    <div class="row">
        <div class="col-12">
            <table class="table">
                <caption class="caption-top">
                    <h2>{{ sidebar.title }}</h2>
                </caption>
                <thead>
                    <tr>
                        <th>un (url)</th>
                        <th>description</th>
                        <th>variable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in sidebar.manager.list" :key="item.ui">
                        <td>
                            <div class="btn-group">
                                <DeleteButton
                                    :manager="sidebar.manager"
                                    :item="item"
                                ></DeleteButton>
                                <ChangeButton
                                    :manager="sidebar.manager"
                                    :item="item"
                                ></ChangeButton>
                            </div>
                        </td>
                        <td>
                            <input
                                v-model="item.description"
                                placeholder="description"
                                type="text"
                                class="form-control"
                            />
                        </td>
                        <td>
                            <ReferenceList
                                :manager="item.variableManager"
                            ></ReferenceList>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <AddButton
                                :manager="sidebar.manager"
                                value="http://"
                            ></AddButton>
                        </td>
                        <td></td>
                        <td></td>
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
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import ReferenceList from './oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        ReferenceList,
    },
    setup(props, context) {
        const sidebar = reactive(ss.sbManager.get(SideBarEnum.Server))
        return { sidebar }
    },
})
</script>

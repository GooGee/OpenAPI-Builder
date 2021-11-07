<template>
    <table class="table">
        <caption class="caption-top">
            <input
                v-model="sidebar.item.description"
                placeholder="description"
                type="text"
                class="form-control"
            />
        </caption>
        <thead>
            <tr>
                <th>
                    <SortButton :manager="sidebar.item.propertyManager"></SortButton>
                    un
                </th>
                <th>value</th>
                <th>tag</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in sidebar.item.propertyManager.list" :key="item.ui">
                <td>
                    <div class="btn-group mr11">
                        <DeleteButton
                            :manager="sidebar.item.propertyManager"
                            :item="item"
                        ></DeleteButton>
                        <ChangeButton
                            :manager="sidebar.item.propertyManager"
                            :item="item"
                        ></ChangeButton>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.value" />
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.tag" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton :manager="sidebar.item.propertyManager"></AddButton>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import SortButton from '../button/SortButton.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        SortButton,
    },
    props: {
        sidebar: {
            type: Object as PropType<SideBar>,
            required: true,
        },
    },
})
</script>

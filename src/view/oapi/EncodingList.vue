<template>
    <table class="table">
        <thead>
            <tr>
                <td class="w111">ui</td>
                <td>contentType</td>
                <td>style</td>
                <td>explode</td>
                <td>allowReserved</td>
                <td>headers</td>
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
                <td>
                    <input v-model="item.contentType" type="text" class="form-control" />
                </td>
                <td>
                    <input v-model="item.style" type="text" class="form-control" />
                </td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            :id="item.ui + 'explode'"
                            v-model="item.explode"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label :for="item.ui + 'explode'" class="custom-control-label"></label>
                    </span>
                </td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            :id="item.ui + 'allowReserved'"
                            v-model="item.allowReserved"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="item.ui + 'allowReserved'"
                            class="custom-control-label"
                        ></label>
                    </span>
                </td>
                <td>
                    <ReferenceList :manager="item.headerManager" type="headers"></ReferenceList>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton :manager="manager"></AddButton>
                </td>
                <td colspan="5"></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddButton from '../button/AddButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import ReferenceList from './ReferenceList.vue'

export default defineComponent({
    components: {
        AddButton,
        DeleteButton,
        ReferenceList,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
})
</script>

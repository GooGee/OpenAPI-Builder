<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">ui</td>
                <td>
                    <div class="btn-group">
                        <DeleteButton
                            v-bind="$attrs"
                            :manager="manager"
                            :item="item"
                        ></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.ui }} </span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="text-right">authorizationUrl</td>
                <td>
                    <input v-model="item.authorizationUrl" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td class="text-right">refreshUrl</td>
                <td>
                    <input v-model="item.refreshUrl" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td class="text-right">tokenUrl</td>
                <td>
                    <input v-model="item.tokenUrl" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td class="text-right">scopes</td>
                <td>
                    <table class="table">
                        <tbody>
                            <tr v-for="scope in item.scopeManager.list" :key="scope.ui">
                                <td>
                                    <div class="btn-group">
                                        <DeleteButton
                                            :manager="item.scopeManager"
                                            :item="scope"
                                        ></DeleteButton>
                                        <ChangeButton
                                            :manager="item.scopeManager"
                                            :item="scope"
                                        ></ChangeButton>
                                    </div>
                                </td>
                                <td>
                                    <input v-model="scope.value" type="text" class="form-control" />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <AddButton :manager="item.scopeManager"></AddButton>
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
})
</script>

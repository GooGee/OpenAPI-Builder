<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">un</td>
                <td>
                    <slot></slot>
                </td>
            </tr>
            <tr>
                <td class="text-right">authorizationUrl</td>
                <td>
                    <input
                        v-model="item.authorizationUrl"
                        type="text"
                        class="form-control"
                    />
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
                            <tr v-for="scope in item.scopeManager.list" :key="scope.id">
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
                                    <input
                                        v-model="scope.value"
                                        type="text"
                                        class="form-control"
                                    />
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
import OAuthFlow from '@/model/OAPI/OAuthFlow'
import { defineComponent, PropType } from 'vue'
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
        item: {
            type: Object as PropType<OAuthFlow>,
            required: true,
        },
    },
})
</script>

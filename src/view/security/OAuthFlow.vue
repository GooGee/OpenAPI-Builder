<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w222">un</td>
                <td>
                    <slot></slot>
                </td>
            </tr>
            <tr v-if="item.hasAuthorization">
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
            <tr v-if="item.hasToken">
                <td class="text-right">tokenUrl</td>
                <td>
                    <input v-model="item.tokenUrl" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td class="text-right">scopes</td>
                <td>
                    <ReferenceList :manager="item.scopeManager"></ReferenceList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import OAuthFlow from '@/model/OAPI/OAuthFlow'
import { defineComponent, PropType } from 'vue'
import ReferenceList from '../oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        ReferenceList,
    },
    props: {
        item: {
            type: Object as PropType<OAuthFlow>,
            required: true,
        },
    },
})
</script>

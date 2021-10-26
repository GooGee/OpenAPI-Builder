<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">description</td>
                <td>
                    <input
                        type="text"
                        class="form-control"
                        v-model="item.description"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">type</td>
                <td>
                    <select v-model="item.type" class="form-control wa">
                        <option v-for="item in typexx" :value="item" :key="item">
                            {{ item }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr v-if="item.type === 'apiKey'">
                <td class="text-right">name</td>
                <td>
                    <input v-model="item.name" type="text" class="form-control" />
                </td>
            </tr>
            <tr v-if="item.type === 'apiKey'">
                <td class="text-right">in</td>
                <td>
                    <select v-model="item.location" class="form-control wa">
                        <option v-for="item in locationxx" :value="item" :key="item">
                            {{ item }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr v-if="item.type === 'http'">
                <td class="text-right">scheme</td>
                <td>
                    <input v-model="item.scheme" type="text" class="form-control" />
                </td>
            </tr>
            <tr v-if="item.type === 'http'">
                <td class="text-right">bearerFormat</td>
                <td>
                    <input
                        v-model="item.bearerFormat"
                        type="text"
                        class="form-control"
                    />
                </td>
            </tr>
            <tr v-if="item.type === 'openIdConnect'">
                <td class="text-right">openIdConnectUrl</td>
                <td>
                    <input
                        v-model="item.openIdConnectUrl"
                        type="text"
                        class="form-control"
                    />
                </td>
            </tr>
            <tr v-if="item.type === 'oauth2'">
                <td class="text-right">flows</td>
                <td>
                    <OAuthFlowList :manager="item.oAuthFlowManager"></OAuthFlowList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SecurityScheme from '@/model/OAPI/SecurityScheme'
import { defineComponent, PropType } from 'vue'
import OAuthFlowList from './OAuthFlowList.vue'

export default defineComponent({
    components: {
        OAuthFlowList,
    },
    props: {
        item: {
            type: Object as PropType<SecurityScheme>,
            required: true,
        },
    },
    setup(props, context) {
        return {
            locationxx: ['cookie', 'header', 'query'],
            typexx: ['apiKey', 'http', 'oauth2', 'openIdConnect'],
        }
    },
})
</script>

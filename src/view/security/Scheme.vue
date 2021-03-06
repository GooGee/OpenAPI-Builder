<template>
    <PropertyTable v-if="sss.sidebar.item">
        <tr>
            <td class="text-right">type</td>
            <td>
                <select v-model="sss.sidebar.item.type" class="form-control wa">
                    <option v-for="item in typexx" :value="item" :key="item">
                        {{ item }}
                    </option>
                </select>
            </td>
        </tr>
        <tr v-if="sss.sidebar.item.type === 'apiKey'">
            <td class="text-right">name</td>
            <td>
                <input v-model="sss.sidebar.item.name" type="text" class="form-control" />
            </td>
        </tr>
        <tr v-if="sss.sidebar.item.type === 'apiKey'">
            <td class="text-right">in</td>
            <td>
                <select v-model="sss.sidebar.item.location" class="form-control wa">
                    <option v-for="item in locationxx" :value="item" :key="item">
                        {{ item }}
                    </option>
                </select>
            </td>
        </tr>
        <tr v-if="sss.sidebar.item.type === 'http'">
            <td class="text-right">scheme</td>
            <td>
                <input v-model="sss.sidebar.item.scheme" type="text" class="form-control" />
            </td>
        </tr>
        <tr v-if="sss.sidebar.item.type === 'http'">
            <td class="text-right">bearerFormat</td>
            <td>
                <input v-model="sss.sidebar.item.bearerFormat" type="text" class="form-control" />
            </td>
        </tr>
        <tr v-if="sss.sidebar.item.type === 'openIdConnect'">
            <td class="text-right">openIdConnectUrl</td>
            <td>
                <input
                    v-model="sss.sidebar.item.openIdConnectUrl"
                    type="text"
                    class="form-control"
                />
            </td>
        </tr>
        <tr v-if="sss.sidebar.item.type === 'oauth2'">
            <td class="text-right">flows</td>
            <td>
                <OAuthFlowList :manager="sss.sidebar.item.oAuthFlowManager"></OAuthFlowList>
            </td>
        </tr>
    </PropertyTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SideBarEnum } from '@/model/Data/SideBar'
import OAuthFlowList from './OAuthFlowList.vue'
import PropertyTable from '../oapi/PropertyTable.vue'
import sss from '@/sss.ts'

export default defineComponent({
    components: {
        OAuthFlowList,
        PropertyTable,
    },
    data() {
        return {
            sss,
            locationxx: ['cookie', 'header', 'query'],
            typexx: ['apiKey', 'http', 'oauth2', 'openIdConnect'],
        }
    },
})
</script>

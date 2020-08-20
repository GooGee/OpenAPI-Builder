<template>
    <div>
        <table class="table">
            <tbody>
                <tr>
                    <td class="text-right" width="111px"></td>
                    <td>
                        <b-button-group>
                            <DeleteButton :manager="manager" :item="item"></DeleteButton>
                            <ChangeButton :item="item" name="name"></ChangeButton>
                        </b-button-group>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">name</td>
                    <td>
                        <b-form-input v-model="item.name2"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">type</td>
                    <td>
                        <b-form-select v-model="item.type" :options="typeList"></b-form-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">description</td>
                    <td>
                        <b-form-input v-model="item.description"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">in</td>
                    <td>
                        <b-form-select v-model="item.location" :options="locationList"></b-form-select>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">scheme</td>
                    <td>
                        <b-form-input v-model="item.scheme"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">bearerFormat</td>
                    <td>
                        <b-form-input v-model="item.bearerFormat"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">openIdConnectUrl</td>
                    <td>
                        <b-form-input v-model="item.openIdConnectUrl"></b-form-input>
                    </td>
                </tr>
            </tbody>
        </table>

        <OAuthFlow :item="item.flows.implicit" title="implicit"></OAuthFlow>
        <OAuthFlow :item="item.flows.password" title="password"></OAuthFlow>
        <OAuthFlow :item="item.flows.clientCredentials" title="clientCredentials"></OAuthFlow>
        <OAuthFlow :item="item.flows.authorizationCode" title="authorizationCode"></OAuthFlow>
    </div>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import OAuthFlow from './OAuthFlow.vue'

export default {
    name: 'SecurityScheme',
    components: {
        ChangeButton,
        DeleteButton,
        OAuthFlow,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            locationList: ['cookie', 'header', 'query'],
            typeList: ['apiKey', 'http', 'oauth2', 'openIdConnect'],
        }
    },
}
</script>

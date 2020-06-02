<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h2>{{ title }}</h2>
        </caption>
        <tbody>
            <tr>
                <td>authorizationUrl</td>
                <td>
                    <b-form-input v-model="item.authorizationUrl"></b-form-input>
                </td>
            </tr>
            <tr>
                <td>tokenUrl</td>
                <td>
                    <b-form-input v-model="item.tokenUrl"></b-form-input>
                </td>
            </tr>
            <tr>
                <td>refreshUrl</td>
                <td>
                    <b-form-input v-model="item.refreshUrl"></b-form-input>
                </td>
            </tr>
            <tr>
                <td>scopes</td>
                <td>
                    <NameValue :manager="item.manager"></NameValue>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import NameValue from './NameValue.vue'

export default {
    name: 'OAuthFlow',
    components: { NameValue },
    props: {
        item: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
}
</script>

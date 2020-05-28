<template>
    <div>
        <table class="table b-table b-table-caption-top">
            <caption>
                <h1>Info</h1>
            </caption>
            <tbody>
                <tr>
                    <td class="text-right" width="222px">title</td>
                    <td>
                        <b-form-input v-model="info.title"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">version</td>
                    <td>
                        <b-form-input v-model="info.version"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">description</td>
                    <td>
                        <b-form-input v-model="info.description"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">termsOfService</td>
                    <td>
                        <b-form-input v-model="info.termsOfService"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">contact.name</td>
                    <td>
                        <b-form-input v-model="info.contact.name"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">contact.url</td>
                    <td>
                        <b-form-input v-model="info.contact.url"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">contact.email</td>
                    <td>
                        <b-form-input v-model="info.contact.email"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">license.name</td>
                    <td>
                        <b-form-input v-model="info.license.name"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">license.url</td>
                    <td>
                        <b-form-input v-model="info.license.url"></b-form-input>
                    </td>
                </tr>
            </tbody>
        </table>

        <External :item="externalDocs"></External>
    </div>
</template>

<script>
import builder from '../states/builder.js'
import External from './specification/External.vue'

export default {
    name: 'Info',
    components: { External },
    data() {
        return {
            info: builder.document.info,
            externalDocs: builder.document.externalDocs,
        }
    },
}
</script>

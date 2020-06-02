<template>
    <div>
        <table class="table b-table b-table-caption-top">
            <caption>
                <h1 class="inline mr11">Info</h1>
                <b-button-group>
                    <b-button @click="download" variant="outline-success"> Download </b-button>
                    <b-button @click="toAPI" variant="outline-success"> Export </b-button>
                </b-button-group>
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
import FileSaver from 'file-saver'
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
    methods: {
        download() {
            try {
                const name = builder.document.info.title + builder.extention
                this.save(name, JSON.stringify(builder))
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        toAPI() {
            try {
                const name = builder.document.info.title + '.json'
                this.save(name, JSON.stringify(builder.document.toAPI()))
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        save(name, text) {
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
            FileSaver.saveAs(blob, name)
        },
    },
}
</script>

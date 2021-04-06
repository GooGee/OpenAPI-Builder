<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Import</h2>
        </caption>
        <tbody>
            <tr>
                <td class="text-right w222">text</td>
                <td>
                    <textarea
                        v-model="text"
                        class="form-control"
                        spellcheck="false"
                        rows="5"
                    ></textarea>
                </td>
            </tr>
            <tr>
                <td class="text-right">format</td>
                <td>
                    <label class="mr11">
                        <input v-model="csv" :value="true" type="radio" /> CSV
                    </label>
                    <label> <input v-model="csv" :value="false" type="radio" /> JSON </label>
                    <p class="cred">
                        <span v-if="csv">make sure the first line is field names</span>
                        <span v-else>text must be an array of object</span>
                    </p>
                </td>
            </tr>
            <tr v-if="csv" class="text-right">
                <td>field delimiter</td>
                <td>
                    <input v-model="delimiter" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <span @click="parse" class="btn btn-outline-primary"> Next </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { parseCSV } from '@/helper/parseCSV'
import toast from '@/helper/toast'
import { KeyManager } from '@/model/Data/Key'

export default defineComponent({
    props: {
        manager: {
            type: KeyManager,
            required: true,
        },
    },
    setup(props, context) {
        const text = props.manager.list.map(item => item.ui).join(',')
        const data = reactive({
            csv: true,
            delimiter: ',',
            namexx: [],
            text,
            parse() {
                try {
                    if (this.csv) {
                        const result = parseCSV(this.text, this.delimiter)
                        context.emit('parsed', result.data)
                        return
                    }
                    const result = JSON.parse(this.text)
                    context.emit('parsed', result)
                } catch (error) {
                    toast.error(error.message)
                }
            },
        })

        return data
    },
})
</script>

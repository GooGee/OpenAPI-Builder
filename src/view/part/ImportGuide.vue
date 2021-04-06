<template>
    <div>
        <ImportText v-show="importing" :manager="manager" @parsed="convert"></ImportText>
        <table v-show="importing === false" class="table">
            <caption class="caption-top">
                <h2>Map</h2>
            </caption>
            <tbody>
                <tr v-for="key in manager.list" :key="key.ui">
                    <td class="text-right w111">{{ key.ui }}</td>
                    <td>
                        <select v-model="key.value" class="form-control">
                            <option value="" disabled selected>----</option>
                            <option v-for="item in valuexx" :key="item" :value="item">
                                {{ item }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span @click="importing = true" class="btn btn-outline-primary mr11">
                            Back
                        </span>
                        <span @click="run" class="btn btn-outline-primary"> Import </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { convert } from '@/helper/convert'
import { StringObject } from '@/helper/parseCSV'
import ImportText from './ImportText.vue'
import toast from '@/helper/toast'
import { KeyManager } from '@/model/Data/Key'

export default defineComponent({
    components: {
        ImportText,
    },
    props: {
        manager: {
            type: KeyManager,
            required: true,
        },
    },
    setup(props, context) {
        let itemxx: StringObject[] = []

        const data = reactive({
            valuexx: [] as string[],
            importing: true,
            convert(result: StringObject[]) {
                // console.log(result)
                data.importing = false
                itemxx = result
                if (result.length) {
                    data.valuexx = Object.keys(result[0])
                }
            },
            run() {
                // console.log(itemxx)
                try {
                    props.manager.list.forEach(item => {
                        if (item.required) {
                            if (item.value === '') {
                                throw new Error('Please set the ' + item.ui)
                            }
                        }
                    })
                } catch (error) {
                    toast.error(error.message)
                    return
                }

                const empty = props.manager.list.every(item => item.value === '')
                if (empty) {
                    toast.error('Please set the map')
                    return
                }

                const map = new Map<string, string>()
                props.manager.list.forEach(item => {
                    map.set(item.ui, item.value)
                })
                const result = convert(itemxx, map)
                context.emit('converted', result)
            },
        })

        return data
    },
})
</script>

<template>
    <div>
        <ImportText v-show="importing" @parsed="convert"></ImportText>
        <table v-show="importing === false" class="table">
            <caption class="caption-top">
                <h2>Map</h2>
            </caption>
            <tbody>
                <tr v-for="key in list" :key="key.name">
                    <td class="text-right w111">{{ key.name }}</td>
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
import { convert, MapObject } from '@/helper/convert'
import { StringObject } from '@/helper/parseCSV'
import ImportText from './ImportText.vue'
import toast from '@/helper/toast'

export default defineComponent({
    components: {
        ImportText,
    },
    props: {
        keyxx: {
            type: Array,
            required: true,
        },
    },
    setup(props, context) {
        const list: MapObject[] = []
        props.keyxx.forEach(item => {
            list.push({
                name: item as string,
                value: '',
            })
        })

        let itemxx: StringObject[] = []

        const data = reactive({
            list,
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
                const empty = list.every(item => item.value === '')
                if (empty) {
                    toast.toast('Please set the map')
                    return
                }
                const map = new Map<string, string>()
                list.forEach(item => {
                    map.set(item.name, item.value)
                })
                const result = convert(itemxx, map)
                context.emit('converted', result)
            },
        })

        return data
    },
})
</script>

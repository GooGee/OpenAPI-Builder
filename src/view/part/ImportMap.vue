<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Map</h2>
        </caption>
        <tbody>
            <tr v-for="key in manager.list" :key="key.id">
                <td class="text-right w111">
                    {{ key.un }}
                    <span v-if="key.required" class="text-danger">*</span>
                </td>
                <td>
                    <select v-model="key.value" class="form-control">
                        <option value="" selected>----</option>
                        <option v-for="item in valuexx" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <span @click="$emit('back')" class="btn btn-outline-secondary mr11">
                        Back
                    </span>
                    <span @click="run" class="btn btn-outline-primary"> Import </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { ImportItemManager } from '@/model/Entity/ImportItem'
import Toast from '@/model/Service/Toast'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object as PropType<ImportItemManager>,
            required: true,
        },
        valuexx: {
            type: Object as PropType<string[]>,
            required: true,
        },
    },
    setup(props, context) {
        function run() {
            try {
                props.manager.list.forEach((item) => {
                    if (item.required) {
                        if (item.value === '') {
                            throw new Error('Please set the ' + item.un)
                        }
                    }
                })
            } catch (error) {
                Toast.error(error.message)
                return
            }

            const empty = props.manager.list.every((item) => item.value === '')
            if (empty) {
                Toast.error('Please set the map')
                return
            }

            const map = new Map<string, string>()
            props.manager.list.forEach((item) => {
                map.set(item.un, item.value)
            })
            context.emit('map', map)
        }
        return { run }
    },
})
</script>

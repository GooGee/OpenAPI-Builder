<template>
    <table class="table">
        <thead>
            <tr>
                <th></th>
                <th>schema</th>
                <th>examples</th>
            </tr>
        </thead>
        <tbody>
            <MediaType
                v-for="item in manager.list"
                :key="item.ui"
                :item="item"
                :manager="manager"
            ></MediaType>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <select @change="add($event.target.value)" class="form-control wa">
                        <option value="" disabled>----</option>
                        <option v-for="item in typexx" :value="item.ui" :key="item.ui">
                            {{ item.ui }}
                        </option>
                    </select>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MediaType from './MediaType.vue'
import sss from '@/sss.ts'
import Property from '@/model/Data/Property'

export default defineComponent({
    components: {
        MediaType,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            typexx: [] as Property[],
        }
    },
    created() {
        if (sss.project) {
            const ppp = sss.project.getPreset('MediaType')
            if (ppp) {
                this.typexx = ppp.propertyManager.list
            }
        }
    },
    methods: {
        add(ui: string) {
            try {
                const item = this.manager.make(ui)
                this.manager.add(item)
            } catch (error) {
                alert(error)
            }
        },
    },
})
</script>

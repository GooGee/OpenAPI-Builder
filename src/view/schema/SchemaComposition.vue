<template>
    <table class="table">
        <thead>
            <tr>
                <th class="w111">schema</th>
                <th>description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.ui }} </span>
                    </div>
                </td>
                <td>
                    <span v-if="find(item.ui)">
                        {{ find(item.ui).description }}
                    </span>
                    <span v-else class="text-danger">Schema not found</span>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <ReferenceShow @select="select"> + </ReferenceShow>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import DeleteButton from '../button/DeleteButton.vue'
import ReferenceShow from '../oapi/ReferenceShow.vue'
import UniqueItem from '@/model/Base/UniqueItem'

export default defineComponent({
    components: {
        DeleteButton,
        ReferenceShow,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        ui: {
            type: String,
            required: true,
        },
    },
    methods: {
        find(ui: string) {
            return sss.getProject().oapi.component.schemaManager.find(ui)
        },
        select(selected: UniqueItem) {
            try {
                if (this.ui === selected.ui) {
                    throw new Error('Cannot include self!')
                }
                const item = this.manager.make(selected.ui)
                this.manager.add(item)
            } catch (error) {
                alert(error)
            }
        },
    },
})
</script>

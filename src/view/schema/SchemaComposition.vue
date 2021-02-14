<template>
    <table class="table">
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.reference.ui }} </span>
                    </div>
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
    },
    methods: {
        select(selected: UniqueItem) {
            try {
                const item = this.manager.make(selected.ui)
                item.type = 'reference'
                item.reference.ui = selected.ui
                this.manager.add(item)
            } catch (error) {
                alert(error)
            }
        },
    },
})
</script>

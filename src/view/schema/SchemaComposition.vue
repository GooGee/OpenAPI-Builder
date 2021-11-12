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
                        <span class="btn btn-outline-secondary"> {{ item.un }} </span>
                    </div>
                </td>
                <td>
                    <span v-if="find(item.un)">
                        {{ find(item.un).description }}
                    </span>
                    <span v-else class="text-danger">Schema not found</span>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <Reference
                        :reference="reference"
                        :withBlank="false"
                        text="+"
                        @select="select"
                    ></Reference>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import Toast from '@/model/Service/Toast'
import { ReferenceManager } from '@/model/OAPI/Reference'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from '../oapi/Reference.vue'

export default defineComponent({
    components: {
        DeleteButton,
        Reference,
    },
    props: {
        manager: {
            type: Object as PropType<ReferenceManager>,
            required: true,
        },
        ui: {
            type: Number,
            required: true,
        },
    },
    setup(props, context) {
        function find(un: string) {
            return ss.project.oapi.component.schemaManager.findByUN(un)
        }
        const reference = props.manager.make(0)
        function select() {
            try {
                if (props.ui === reference.ui) {
                    throw new Error('Cannot include self!')
                }
                const item = props.manager.make(reference.ui)
                props.manager.add(item)
            } catch (error) {
                Toast.error(error.message)
            }
        }
        return { find, reference, select }
    },
})
</script>

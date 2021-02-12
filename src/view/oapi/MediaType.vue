<template>
    <tr>
        <td>
            <div class="btn-group">
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <span class="btn btn-outline-secondary"> {{ item.ui }} </span>
            </div>
        </td>
        <td>
            <SchemaSimple :schema="item.schema"></SchemaSimple>
        </td>
        <td>
            <ReferenceList :manager="item.exampleManager" type="examples"></ReferenceList>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import ReferenceList from './ReferenceList.vue'
import SchemaSimple from '../schema/SchemaSimple.vue'

export default defineComponent({
    components: {
        DeleteButton,
        ReferenceList,
        SchemaSimple,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
})
</script>

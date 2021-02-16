<template>
    <div>
        <div class="mtb11">
            <ButtonGroup @select="select" :name="type" :list="typexx"></ButtonGroup>
        </div>

        <Operation v-if="operation" :item="operation">
            <div class="btn-group">
                <DeleteButton :manager="manager" :item="operation"></DeleteButton>
                <span class="btn btn-outline-secondary"> {{ operation.ui }} </span>
            </div>
        </Operation>

        <template v-else>
            <h2 class="inline mr11">{{ type }}</h2>
            <AddButton :manager="manager" :value="type" :noinput="true"></AddButton>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Operation from './Operation.vue'
import Path from '@/model/OAPI/Path'
import UniqueItem from '@/model/Base/UniqueItem'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        Operation,
    },
    data() {
        return {
            type: 'get',
            typexx: ['get', 'delete', 'head', 'options', 'patch', 'post', 'put', 'trace'],
        }
    },
    computed: {
        manager() {
            const item = sss.sidebar.item as Path
            return item.operationManager
        },
        operation(): UniqueItem | undefined {
            return this.manager.find(this.type)
        },
    },
    methods: {
        select(type: string) {
            this.type = type
        },
    },
})
</script>

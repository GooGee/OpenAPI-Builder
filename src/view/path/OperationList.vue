<template>
    <div>
        <div class="mtb11">
            <ButtonGroup
                @select="select"
                :name="type"
                :list="typexx"
                :manager="manager"
            ></ButtonGroup>
        </div>

        <Operation v-if="operation" :item="operation">
            <div class="btn-group">
                <DeleteButton @deleted="update" :manager="manager" :item="operation"></DeleteButton>
                <span class="btn btn-outline-secondary"> {{ operation.ui }} </span>
            </div>
        </Operation>

        <template v-else>
            <h2 class="inline mr11">{{ type }}</h2>
            <AddButton @added="update" :manager="manager" :value="type" :noinput="true"></AddButton>
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
            operation: null,
        }
    },
    computed: {
        manager() {
            const item = sss.sidebar.item as Path
            return item.operationManager
        },
    },
    created() {
        this.update()
    },
    methods: {
        select(type: string) {
            this.type = type
            this.update()
        },
        update() {
            const found = this.manager.find(this.type)
            if (found) {
                this.operation = found as any
            } else {
                this.operation = null
            }
        },
    },
})
</script>

<template>
    <div>
        <div class="mtb11">
            <ButtonGroup
                v-model:option="option"
                :list="optionxx"
                :manager="manager"
            ></ButtonGroup>
        </div>

        <Operation v-if="operation" :item="operation">
            <div class="btn-group">
                <DeleteButton :item="operation" :manager="manager"></DeleteButton>
                <span class="btn btn-outline-secondary"> {{ operation.un }} </span>
            </div>
        </Operation>

        <template v-else>
            <h2 class="inline mr11">{{ option }}</h2>
            <AddButton :manager="manager" :value="option" :noinput="true"></AddButton>
        </template>
    </div>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import Path from '@/model/OAPI/Path'
import { computed, defineComponent, inject, ref } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Operation from './Operation.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        Operation,
    },
    setup(props, context) {
        const sidebar = inject('sidebar') as SideBar<Path>
        const manager = computed(function () {
            return sidebar.item!.operationManager
        })

        const optionxx = [
            'get',
            'delete',
            'head',
            'options',
            'patch',
            'post',
            'put',
            'trace',
        ]
        const option = ref(optionxx[0])

        const operation = computed(function () {
            return manager.value.findByUN(option.value) ?? null
        })

        return {
            manager,
            operation,
            option,
            optionxx,
        }
    },
})
</script>

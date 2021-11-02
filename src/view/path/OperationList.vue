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
                <DeleteButton
                    @remove="update"
                    :item="operation"
                    :manager="manager"
                ></DeleteButton>
                <span class="btn btn-outline-secondary"> {{ operation.un }} </span>
            </div>
        </Operation>

        <template v-else>
            <h2 class="inline mr11">{{ option }}</h2>
            <AddButton
                @added="update"
                :manager="manager"
                :value="option"
                :noinput="true"
            ></AddButton>
        </template>
    </div>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import UniqueItem from '@/model/Entity/UniqueItem'
import Path from '@/model/OAPI/Path'
import { computed, defineComponent, inject, ref, watch } from 'vue'
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
        const selected = ref(optionxx[0])
        const option = computed({
            get() {
                return selected.value
            },
            set(value: string) {
                selected.value = value
                update()
            },
        })

        function getManager() {
            return sidebar.item!.operationManager
        }

        const operation = ref<UniqueItem | null>(null)
        function update() {
            operation.value = getManager().find(option.value) ?? null
        }
        update()

        const manager = ref(getManager())
        watch(
            () => sidebar.item,
            () => {
                manager.value = getManager()
                update()
            },
        )
        return {
            manager,
            operation,
            option,
            optionxx,
            update,
        }
    },
})
</script>

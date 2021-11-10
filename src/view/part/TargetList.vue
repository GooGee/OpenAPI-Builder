<template>
    <div v-for="item in manager.list" :key="item.ui" class="mb11">
        <div class="btn-group">
            <DeleteButton :manager="manager" :item="item"></DeleteButton>
            <span class="btn btn-outline-secondary"> {{ getName(item.ui) }} </span>
        </div>
    </div>
    <span @click="select" class="btn btn-outline-primary"> + </span>
</template>

<script lang="ts">
import { TargetManager } from '@/model/Entity/Target'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import store from '@/store'
import { defineComponent, PropType } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'

const TargetList = defineComponent({
    components: {
        DeleteButton,
    },
    props: {
        manager: {
            type: Object as PropType<TargetManager>,
            required: true,
        },
    },
    setup(props, context) {
        const source = ss.targetFinder.findManager(props.manager.targetType)
        function getName(ui: number) {
            const found = source.find(ui)
            if (found === undefined) {
                return '????'
            }
            return found.un
        }
        function select() {
            const listModal = store.listModal
            listModal.showList(source.list, 'Select a ', function add(tag) {
                try {
                    const one = props.manager.make(tag.ui)
                    props.manager.add(one)
                } catch (error) {
                    Toast.error(error.message)
                }
            })
        }
        return { getName, select }
    },
})

export default TargetList
</script>

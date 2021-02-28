<template>
    <div class="pre-scrollable position-fixed" style="max-height: 90%; height: 90vh">
        <div class="text-center mtb11">
            <h2 class="inline mr11">{{ sidebar.title }}</h2>
            <AddButton :manager="sidebar.manager"></AddButton>
        </div>

        <input type="text" class="form-control" placeholder="Search" v-model="sidebar.keyword" />

        <div :key="key" class="list-group mt11">
            <div
                v-for="item in sidebar.list"
                :key="item.ui"
                @click="select(item)"
                :class="Object.is(sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ item.ui }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import sss from '@/sss.ts'
import AddButton from '../button/AddButton.vue'
import UniqueItem from '@/model/Base/UniqueItem'
import SideBar from '@/model/Data/SideBar'
import { EventEnum } from '@/model/Event/StateEvent'

export default defineComponent({
    components: {
        AddButton,
    },
    props: {
        sidebar: {
            type: SideBar,
            required: true,
        },
    },
    setup(props, context) {
        const key = ref(new Date().toISOString())
        sss.event.state.ee.on(
            EventEnum.AfterCodeRun,
            data => (key.value = new Date().toISOString()),
        )
        const select = (item: UniqueItem) => {
            props.sidebar.item = item
            context.emit('select', item)
        }
        return { key, select }
    },
})
</script>

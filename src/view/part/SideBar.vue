<template>
    <div>
        <div class="text-center mtb11">
            <h2 class="inline mr11">{{ sidebar.title }}</h2>
            <AddButton
                :manager="sidebar.manager"
                :value="value"
                @added="select"
            ></AddButton>
        </div>

        <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="sidebar.keyword"
        />

        <div v-if="list.length" class="list-group mt11">
            <SideBarItem
                v-for="item in list"
                :key="item.ui"
                :item="item"
                :manager="sidebar.manager"
                @click="select(item)"
                :class="{ active: sidebar.item.un === item.un }"
            ></SideBarItem>
        </div>
    </div>
</template>

<script lang="ts">
import emitter from '@/emitter'
import { EventEnum } from '@/model/Entity/Event'
import SideBar from '@/model/Entity/SideBar'
import SideBarItemData from '@/model/Entity/SideBarItem'
import UniqueItem from '@/model/Entity/UniqueItem'
import { defineComponent, PropType, ref, watch } from 'vue'
import AddButton from '../button/AddButton.vue'
import SideBarItem from './SideBarItem.vue'

export default defineComponent({
    components: {
        AddButton,
        SideBarItem,
    },
    props: {
        value: {
            type: String,
            required: false,
            default: 'name',
        },
        sidebar: {
            type: Object as PropType<SideBar>,
            required: true,
        },
    },
    setup(props, context) {
        function select(item: SideBarItemData) {
            emitter.emit(EventEnum['sidebar-list-change'])
            props.sidebar.item = item
        }
        if (props.sidebar.item === null) {
            if (props.sidebar.manager.list.length) {
                select(props.sidebar.manager.list[0])
            }
        }

        const list = ref<UniqueItem[]>([])
        emitter.on(EventEnum['sidebar-list-change'], update)
        watch(() => props.sidebar.keyword, update, { immediate: true })

        function update() {
            list.value = props.sidebar.manager.filter(props.sidebar.keyword)
        }

        return {
            select,
            list,
        }
    },
})
</script>

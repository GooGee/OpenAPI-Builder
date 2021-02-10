<template>
    <div class="pre-scrollable position-fixed" style="max-height: 90%; height: 90vh">
        <div class="text-center mtb11">
            <h2 class="inline mr11">{{ sss.sidebar.title }}</h2>
            <AddButton :manager="sss.sidebar.manager"></AddButton>
        </div>

        <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="sss.sidebar.keyword"
        />

        <div class="list-group mt11">
            <div
                v-for="item in sss.sidebar.list"
                :key="item.name"
                @click="sss.sidebar.item = item"
                :class="Object.is(sss.sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import AddButton from '../button/AddButton.vue'

export default defineComponent({
    components: {
        AddButton,
    },
    data() {
        return {
            sss,
        }
    },
})
</script>

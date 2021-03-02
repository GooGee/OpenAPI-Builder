<template>
    <span @click="show" class="btn btn-outline-primary"> {{ item.ui }} </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import UniqueItem from '@/model/Base/UniqueItem'
import ShowListDialogue from '../hook/ShowListDialogue'

export default defineComponent({
    props: {
        item: {
            type: UniqueItem,
            required: true,
        },
    },
    setup(props) {
        const list = sss.getProject().templateManager.list
        const title = 'Select a Template'
        const ddd = ShowListDialogue(list, title, (item: UniqueItem) => {
            props.item.ui = item.ui
        })
        return ddd
    },
})
</script>

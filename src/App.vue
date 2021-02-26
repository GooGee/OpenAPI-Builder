<template>
    <div>
        <Bar></Bar>
        <div class="container-fluid" style="margin-top: 55px">
            <router-view></router-view>
        </div>
        <ListDialogue></ListDialogue>
        <UIDialogue></UIDialogue>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import Bar from './view/part/Bar.vue'
import ListDialogue from './view/part/ListDialogue.vue'
import UIDialogue from './view/part/UIDialogue.vue'
import sss from '@/sss.ts'

export default defineComponent({
    name: 'App',
    components: {
        Bar,
        ListDialogue,
        UIDialogue,
    },
    setup() {
        provide('listDialogue', ref(sss.listDialogue))
        provide('uiDialogue', ref(sss.uiDialogue))
        return {}
    },
})
</script>

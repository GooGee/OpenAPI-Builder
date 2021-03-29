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
import makeBridge from './helper/makeBridge'
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
    created() {
        const sp = new URLSearchParams(window.location.search)
        const ide = sp.get('ide')
        if (ide === null) {
            makeBridge(window as any)
            return
        }

        sss.ide = ide
    },
})
</script>

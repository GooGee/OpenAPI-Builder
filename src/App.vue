<template>
    <div>
        <Bar></Bar>
        <div class="container-fluid" style="margin-top: 55px">
            <router-view></router-view>
        </div>
        <ListDialogue></ListDialogue>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bar from './view/part/Bar.vue'
import ListDialogue from './view/part/ListDialogue.vue'

export default defineComponent({
    name: 'App',
    components: {
        Bar,
        ListDialogue,
    },
})
</script>

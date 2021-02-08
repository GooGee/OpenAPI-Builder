<template>
    <div>
        <Bar></Bar>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bar from './view/part/Bar.vue'

export default defineComponent({
    name: 'App',
    components: {
        Bar,
    },
})
</script>

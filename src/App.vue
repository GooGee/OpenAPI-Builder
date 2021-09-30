<template>
    <Bar :inBrowser="inBrowser"></Bar>
    <div class="container-fluid" style="margin-top: 55px">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Bar from '@/view/part/Bar.vue'
import { defineComponent, provide } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    components: {
        Bar,
    },
    setup(props, context) {
        const route = useRoute()
        let ide = ''
        if (route.params.ide === undefined) {
        } else {
            if (Array.isArray(route.params.ide)) {
                ide = route.params.ide[0]
            } else {
                ide = route.params.ide
            }
        }
        const inBrowser = ide === ''
        provide('inBrowser', inBrowser)
        return {
            inBrowser,
        }
    },
})
</script>

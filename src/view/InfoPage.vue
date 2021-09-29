<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <TabBar path="/info" class="mt11"></TabBar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabBar from './part/TabBar.vue'

export default defineComponent({
    components: {
        TabBar,
    },
    setup(props, context) {
        return {}
    },
})
</script>

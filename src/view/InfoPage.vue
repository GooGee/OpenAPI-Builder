<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <div class="btn-group mtb11">
                <SaveButton></SaveButton>
                <ExportButton></ExportButton>
            </div>
            <TabBar :route="route"></TabBar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import ExportButton from './button/ExportButton.vue'
import SaveButton from './button/SaveButton.vue'
import TabBar from './part/TabBar.vue'

export default defineComponent({
    components: {
        ExportButton,
        SaveButton,
        TabBar,
    },
    data() {
        return {
            route: this.$router.options.routes.find(route => route.name === 'info'),
        }
    },
})
</script>

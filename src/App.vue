<template>
    <Bar :inBrowser="inBrowser"></Bar>
    <div class="container-fluid" style="margin-top: 55px">
        <router-view></router-view>
    </div>
    <ListModal :listModalData="listModalData"></ListModal>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import { useRoute } from 'vue-router'
import ListModalData from './model/Entity/ListModal'
import Bar from './view/part/Bar.vue'
import ListModal from './view/part/ListModal.vue'

export default defineComponent({
    components: {
        Bar,
        ListModal,
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

        const listModalData = reactive(new ListModalData())
        provide('listModalData', listModalData)
        return {
            inBrowser,
            listModalData,
        }
    },
})
</script>

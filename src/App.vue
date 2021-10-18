<template>
    <Bar :inBrowser="inBrowser"></Bar>
    <div class="container-fluid" style="margin-top: 55px">
        <router-view></router-view>
    </div>
    <ListModal :listModalData="listModalData"></ListModal>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import emitter from './emitter'
import { EventEnum } from './model/Entity/Event'
import ListModalData from './model/Entity/ListModal'
import { setReady } from './store'
import Bar from './view/part/Bar.vue'
import ListModal from './view/part/ListModal.vue'

export default defineComponent({
    components: {
        Bar,
        ListModal,
    },
    setup(props, context) {
        const sp = new URLSearchParams(window.location.search)
        const inBrowser = sp.get('ide') === null
        provide('inBrowser', inBrowser)

        const listModalData = reactive(new ListModalData())
        provide('listModalData', listModalData)

        emitter.on(EventEnum.ready, setReady)

        return {
            inBrowser,
            listModalData,
        }
    },
})
</script>
